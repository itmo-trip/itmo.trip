package ru.itmo.dws.itmotrip.api

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import ru.itmo.dws.itmotrip.generated.apis.LocationTypesApiDelegate
import ru.itmo.dws.itmotrip.generated.models.LocationTypeResponse
import ru.itmo.dws.itmotrip.mapper.toLocationTypeResponse
import ru.itmo.dws.itmotrip.service.LocationTypeService

@Component
class LocationTypeController(private val locationTypeService: LocationTypeService) : LocationTypesApiDelegate {
    override fun apiV1LocationTypesGet(): ResponseEntity<List<LocationTypeResponse>> {
        val locationTypes = locationTypeService.getAll()
        return ResponseEntity.ok(locationTypes.map { it.toLocationTypeResponse() })
    }
}