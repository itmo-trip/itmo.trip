package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import ru.itmo.dws.itmotrip.model.LocationType
import ru.itmo.dws.itmotrip.repository.LocationTypeRepository

@Service
class LocationTypeService (
    private val locationTypeRepository: LocationTypeRepository
) {
    fun getAll() : List<LocationType> {
        return locationTypeRepository.getAll()
    }
}