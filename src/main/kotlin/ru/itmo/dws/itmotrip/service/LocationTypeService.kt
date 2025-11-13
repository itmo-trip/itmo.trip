package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ru.itmo.dws.itmotrip.generated.models.LocationTypeResponse
import ru.itmo.dws.itmotrip.mapper.toLocationTypeResponse
import ru.itmo.dws.itmotrip.model.exception.LocationTypeNotFoundException
import ru.itmo.dws.itmotrip.repository.LocationTypeRepository
import java.util.UUID

@Service
class LocationTypeService(
    private val locationTypeRepository: LocationTypeRepository,
) {

    fun getAll(): List<LocationTypeResponse> {
        return locationTypeRepository.getAll().map { it.toLocationTypeResponse() }
    }

    fun getById(id: Long): LocationTypeResponse {
        val type = locationTypeRepository.getById(id) ?: throw LocationTypeNotFoundException(id)
        return type.toLocationTypeResponse()
    }

    @Transactional(readOnly = true)
    fun existsById(id: Long): Boolean {
        return locationTypeRepository.existsById(id)
    }
}