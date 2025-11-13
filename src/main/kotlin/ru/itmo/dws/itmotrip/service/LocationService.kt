package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ru.itmo.dws.itmotrip.generated.models.LocationResponse
import ru.itmo.dws.itmotrip.mapper.toLocationResponse
import ru.itmo.dws.itmotrip.model.exception.LocationNotFoundException
import ru.itmo.dws.itmotrip.repository.LocationRepository
import java.util.UUID

@Service
class LocationService(
    private val locationRepository: LocationRepository,
    private val locationTypeService: LocationTypeService,
    private val userService: UserService,
) {

    @Transactional(readOnly = true)
    fun getById(id: UUID): LocationResponse {
        val location = locationRepository.getByById(id) ?: throw LocationNotFoundException(id)
        val locationType = locationTypeService.getById(location.locationTypeId)
        val user = location.creatorId?.let { userService.getById(it) }

        return location.toLocationResponse(locationType, user)
    }

    @Transactional(readOnly = true)
    fun existsById(id: UUID): Boolean {
        return locationRepository.existsById(id)
    }
}
