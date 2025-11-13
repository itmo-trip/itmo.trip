package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import ru.itmo.dws.itmotrip.generated.models.LocationTypeResponse
import ru.itmo.dws.itmotrip.mapper.toLocationTypeResponse
import ru.itmo.dws.itmotrip.model.exception.LocationTypeNotFoundException
import ru.itmo.dws.itmotrip.repository.LocationTypeRepository

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
}
