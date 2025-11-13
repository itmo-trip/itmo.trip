package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ru.itmo.dws.itmotrip.generated.models.LocationRequest
import ru.itmo.dws.itmotrip.generated.models.LocationResponse
import ru.itmo.dws.itmotrip.mapper.toLocation
import ru.itmo.dws.itmotrip.mapper.toLocationResponse
import ru.itmo.dws.itmotrip.model.Location
import ru.itmo.dws.itmotrip.model.Trip.TripStatus
import ru.itmo.dws.itmotrip.model.User
import ru.itmo.dws.itmotrip.model.exception.BadRequestException
import ru.itmo.dws.itmotrip.model.exception.ForbiddenException
import ru.itmo.dws.itmotrip.model.exception.LocationNotFoundException
import ru.itmo.dws.itmotrip.model.exception.TripNotFoundException
import ru.itmo.dws.itmotrip.repository.LocationRepository
import ru.itmo.dws.itmotrip.util.CoordinatesValidator
import ru.itmo.dws.itmotrip.util.DateUtils.toUtcLocalDateTime
import ru.itmo.dws.itmotrip.util.UUIDv7
import java.util.UUID

@Service
class LocationService(
    private val locationRepository: LocationRepository,
    private val locationTypeService: LocationTypeService,
    private val userService: UserService,
) {

    fun getAll(): List<LocationResponse> {
        return locationRepository.getAll().map {
            val locationType = locationTypeService.getById(it.locationTypeId)
            it.toLocationResponse(locationType)
        }
    }

    @Transactional(readOnly = true)
    fun getById(id: UUID): LocationResponse {
        val location = locationRepository.getById(id) ?: throw LocationNotFoundException(id)
        val locationType = locationTypeService.getById(location.locationTypeId)
        val user = location.creatorId?.let { userService.getById(it) }

        return location.toLocationResponse(locationType, user)
    }

    @Transactional(readOnly = true)
    fun existsById(id: UUID): Boolean {
        return locationRepository.existsById(id)
    }

    @Transactional(readOnly = true)
    fun findAllByCreator(creator: User): List<LocationResponse> {
        return locationRepository.findAllByCreatorIdOrNull(creator.id).map {
            val locationType = locationTypeService.getById(it.locationTypeId)
            it.toLocationResponse(locationType)
        }
    }

    @Transactional
    fun deleteById(id: UUID, user: User) {
        val location = locationRepository.getById(id) ?: throw LocationNotFoundException(id)

        if (user.id != location.creatorId) {
            throw ForbiddenException(user.id)
        }

        locationRepository.deleteById(id)
    }

    @Transactional
    fun createLocation(locationRequest: LocationRequest, user: User): LocationResponse {
        locationRequest.validate()

        val location = locationRequest.toLocation(
            id = UUIDv7.randomUUID(),
            creatorId = user.id,
        )

        locationRepository.insert(
            id = location.id,
            creatorId = location.creatorId,
            locationTypeId = location.locationTypeId,
            name = location.name,
            latitude = location.latitude,
            longitude = location.longitude
        )

        return fetchLocationResponse(location)
    }

    @Transactional
    fun updateLocation(id: UUID, locationRequest: LocationRequest, user: User): LocationResponse {
        locationRequest.validate()

        val oldLocation = locationRepository.getById(id) ?: throw LocationNotFoundException(id)

        if (oldLocation.creatorId != user.id) {
            throw ForbiddenException(user.id)
        }

        locationRepository.updateById(
            id = oldLocation.id,
            locationTypeId = locationRequest.locationTypeId,
            name = locationRequest.name,
            latitude = locationRequest.latitude,
            longitude = locationRequest.longitude,
        )

        val newLocation = locationRepository.getById(id) ?: throw LocationNotFoundException(id)

        return fetchLocationResponse(newLocation)
    }

    private fun LocationRequest.validate() {
        if (CoordinatesValidator.validateCoordinates(latitude, longitude).not()) {
            throw BadRequestException("Invalid geographical coordinates")
        }

        if (locationTypeService.existsById(locationTypeId).not()) {
            throw BadRequestException("Location type must exist")
        }
    }

    private fun fetchLocationResponse(
        location: Location,
    ): LocationResponse {
        val type = locationTypeService.getById(location.locationTypeId)
        val creator = location.creatorId?.let { userService.getById(it) }

        return location.toLocationResponse(type, creator)
    }
}