package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ru.itmo.dws.itmotrip.generated.models.TripRequest
import ru.itmo.dws.itmotrip.generated.models.TripResponse
import ru.itmo.dws.itmotrip.mapper.toTrip
import ru.itmo.dws.itmotrip.mapper.toTripResponse
import ru.itmo.dws.itmotrip.model.Trip
import ru.itmo.dws.itmotrip.model.Trip.TripStatus
import ru.itmo.dws.itmotrip.model.User
import ru.itmo.dws.itmotrip.model.exception.BadRequestException
import ru.itmo.dws.itmotrip.model.exception.ForbiddenException
import ru.itmo.dws.itmotrip.model.exception.TripNotFoundException
import ru.itmo.dws.itmotrip.repository.TripRepository
import ru.itmo.dws.itmotrip.util.DateUtils.toUtcLocalDateTime
import ru.itmo.dws.itmotrip.util.UUIDv7
import java.time.LocalDateTime
import java.time.OffsetDateTime
import java.util.UUID

@Service
class TripService(
    private val tripRepository: TripRepository,
    private val userService: UserService,
    private val locationService: LocationService,
    private val transportTypeService: TransportTypeService,
) {

    enum class FilterType(private val stringValue: String) {
        GREATER_THAN("gt"),
        GREATER_THAN_OR_EQUAL("gte"),
        LESS_THAN("lt"),
        LESS_THAN_OR_EQUAL("lte"),
        EQUAL("eq"),
        ;

        companion object {
            fun fromString(value: String): FilterType? {
                val lower = value.lowercase()
                return entries.firstOrNull { lower == it.stringValue }
            }
        }
    }

    data class Filter<T : Comparable<T>>(val type: FilterType, val value: T) {

        fun apply(input: T?): Boolean {
            val actualInput = input ?: return false

            return when (type) {
                FilterType.EQUAL -> actualInput == value
                FilterType.GREATER_THAN -> actualInput > value
                FilterType.GREATER_THAN_OR_EQUAL -> actualInput >= value
                FilterType.LESS_THAN -> actualInput < value
                FilterType.LESS_THAN_OR_EQUAL -> actualInput <= value
            }
        }
    }

    @Transactional(readOnly = true)
    fun getById(id: UUID): TripResponse {
        val trip = tripRepository.getById(id) ?: throw TripNotFoundException(id)
        return fetchTripResponse(trip)
    }

    @Transactional(readOnly = true)
    fun getAllFiltering(
        arrivalTime: String?,
        departureTime: String?,
        arrivalLocationId: String?,
        departureLocationId: String?,
        transportTypeId: String?,
    ): List<TripResponse> {
        // very, very bad, don't do this at home
        val allTrips = tripRepository.findAll()

        val arrivalDateFilter = arrivalTime?.let { buildTimeFilter(it) }
        val departureDateFilter = departureTime?.let { buildTimeFilter(it) }
        val arrivalLocations: Set<UUID>? = arrivalLocationId?.let {
            runCatching {
                it.split(",").mapTo(mutableSetOf()) { uuidString -> UUID.fromString(uuidString) }
            }.getOrElse { throw BadRequestException("Invalid arrival location ids: $it") }
        }
        val departureLocations: Set<UUID>? = departureLocationId?.let {
            runCatching {
                it.split(",").mapTo(mutableSetOf()) { uuidString -> UUID.fromString(uuidString) }
            }.getOrElse { throw BadRequestException("Invalid departure location ids: $it") }
        }
        val transportTypes: Set<Long>? = transportTypeId?.let {
            runCatching {
                it.split(",").mapTo(mutableSetOf()) { longString -> longString.toLong() }
            }.getOrElse { throw BadRequestException("Invalid transport type ids: $it") }
        }

        val filtered = allTrips.filter { trip ->
            (arrivalDateFilter == null || arrivalDateFilter.apply(trip.arrivalTime)) &&
                    (departureDateFilter == null || departureDateFilter.apply(trip.departureTime)) &&
                    (arrivalLocations == null || trip.arrivalLocationId in arrivalLocations) &&
                    (departureLocations == null || trip.departureLocationId in departureLocations) &&
                    (transportTypes == null || trip.transportTypeId in transportTypes)
        }

        return filtered.map { fetchTripResponse(it) }
    }

    @Transactional
    fun deleteById(id: UUID, user: User) {
        val trip = tripRepository.getById(id) ?: throw TripNotFoundException(id)

        if (user.id != trip.creatorId) {
            throw ForbiddenException(user.id)
        }

        tripRepository.deleteById(id)
    }

    @Transactional
    fun createTrip(tripRequest: TripRequest, user: User): TripResponse {
        tripRequest.validate()
        val trip = tripRequest.toTrip(
            id = UUIDv7.randomUUID(),
            creatorId = user.id,
            status = tripRequest.status?.let { TripStatus.fromString(it) } ?: TripStatus.ACTIVE,
        )

        // save doesn't work with enums
        tripRepository.insert(
            id = trip.id,
            creatorId = trip.creatorId,
            seriesId = trip.seriesId,
            transportTypeId = trip.transportTypeId,
            departureTime = trip.departureTime,
            arrivalTime = trip.arrivalTime,
            departureLocationId = trip.departureLocationId,
            arrivalLocationId = trip.arrivalLocationId,
            status = trip.status.toString(),
            comment = trip.comment
        )

        return fetchTripResponse(trip)
    }

    @Transactional
    fun updateTrip(id: UUID, tripRequest: TripRequest, user: User): TripResponse {
        tripRequest.validate()
        val oldTrip = tripRepository.getById(id) ?: throw TripNotFoundException(id)

        if (oldTrip.creatorId != user.id) {
            throw ForbiddenException(user.id)
        }

        tripRepository.updateById(
            id = oldTrip.id,
            seriesId = tripRequest.seriesId,
            transportTypeId = tripRequest.transportTypeId,
            departureTime = tripRequest.departureTime?.toUtcLocalDateTime(),
            arrivalTime = tripRequest.arrivalTime?.toUtcLocalDateTime(),
            departureLocationId = tripRequest.departureLocationId,
            arrivalLocationId = tripRequest.arrivalLocationId,
            status = tripRequest.status?.let { TripStatus.fromString(it) }?.toString()
                ?: throw BadRequestException("Invalid trip status: ${tripRequest.status}"),
            comment = tripRequest.comment
        )

        val newTrip = tripRepository.getById(id) ?: throw TripNotFoundException(id)

        return fetchTripResponse(newTrip)
    }

    private fun TripRequest.validate() {
        if (departureTime == null && arrivalTime == null) {
            throw BadRequestException("Either departureTime or arrivalTime must be specified")
        }
        if (departureTime != null && arrivalTime != null && departureTime > arrivalTime) {
            throw BadRequestException("Departure time must be before arrival time")
        }
        if (departureLocationId == arrivalLocationId) {
            throw BadRequestException("Departure location and arrival location must be different")
        }

        if (transportTypeService.existsById(transportTypeId).not()) {
            throw BadRequestException("Transport type must exist")
        }

        if (
            locationService.existsById(departureLocationId).not() &&
            locationService.existsById(arrivalLocationId).not()
        ) {
            throw BadRequestException("Departure and arrival locations must exist")
        }
    }

    private fun fetchTripResponse(
        trip: Trip,
    ): TripResponse {
        val creator = userService.getById(trip.creatorId)
        val departureLocation = locationService.getById(trip.departureLocationId)
        val arrivalLocation = locationService.getById(trip.arrivalLocationId)
        val transportType = transportTypeService.getById(trip.transportTypeId)

        return trip.toTripResponse(creator, transportType, arrivalLocation, departureLocation)
    }

    private fun buildTimeFilter(string: String): Filter<LocalDateTime> {
        val (type, value) = string.split(":", limit = 2)
        val filterType = FilterType.fromString(type) ?: throw BadRequestException("Invalid filter type: $type")
        val filterValue = runCatching { OffsetDateTime.parse(value).toUtcLocalDateTime() }.getOrElse {
            throw BadRequestException("Invalid filter value: $value")
        }
        return Filter(filterType, filterValue)
    }
}