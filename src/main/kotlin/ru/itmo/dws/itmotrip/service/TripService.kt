package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ru.itmo.dws.itmotrip.generated.models.TripRequest
import ru.itmo.dws.itmotrip.generated.models.TripResponse
import ru.itmo.dws.itmotrip.mapper.toTripResponse
import ru.itmo.dws.itmotrip.model.Trip
import ru.itmo.dws.itmotrip.model.Trip.TripStatus
import ru.itmo.dws.itmotrip.model.User
import ru.itmo.dws.itmotrip.model.exception.BadRequestException
import ru.itmo.dws.itmotrip.model.exception.ForbiddenException
import ru.itmo.dws.itmotrip.model.exception.TripNotFoundException
import ru.itmo.dws.itmotrip.repository.TripRepository
import ru.itmo.dws.itmotrip.util.UUIDv7
import java.time.ZoneOffset
import java.util.UUID

@Service
class TripService(
    private val tripRepository: TripRepository,
) {

    @Transactional(readOnly = true)
    fun getById(id: UUID): TripResponse {
        val trip = tripRepository.getById(id) ?: throw TripNotFoundException(id)
        return trip.toTripResponse()
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
        // save doesn't work with enums
        val trip = Trip(
            id = UUIDv7.randomUUID(),
            creatorId = user.id,
            seriesId = null, // poka tak
            transportTypeId = tripRequest.transportTypeId,
            departureTime = tripRequest.departureTime?.withOffsetSameInstant(ZoneOffset.UTC)?.toLocalDateTime(),
            arrivalTime = tripRequest.arrivalTime?.withOffsetSameInstant(ZoneOffset.UTC)?.toLocalDateTime(),
            departureLocationId = tripRequest.departureLocationId,
            arrivalLocationId = tripRequest.arrivalLocationId,
            status = tripRequest.status?.let { TripStatus.fromString(it) } ?: TripStatus.ACTIVE,
            comment = tripRequest.comment,
        )
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

        return trip.toTripResponse()
    }

    private fun TripRequest.validate() {
        if (departureTime == null && arrivalTime == null) {
            throw BadRequestException("Either departureTime or arrivalTime must be specified")
        }
        if (departureLocationId == arrivalLocationId) {
            throw BadRequestException("Departure location and arrival location must be different")
        }
    }
}
