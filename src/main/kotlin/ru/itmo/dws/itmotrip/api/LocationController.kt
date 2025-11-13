package ru.itmo.dws.itmotrip.api

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import ru.itmo.dws.itmotrip.generated.apis.LocationsApiDelegate
import ru.itmo.dws.itmotrip.generated.models.LocationRequest
import ru.itmo.dws.itmotrip.generated.models.LocationResponse
import ru.itmo.dws.itmotrip.service.LocationService
import ru.itmo.dws.itmotrip.util.getCurrentUserFromSecurityContext
import java.util.UUID

@Component
class LocationController(private val locationService: LocationService) : LocationsApiDelegate {

    override fun apiV1LocationsGet(): ResponseEntity<List<LocationResponse>> {
        val locations = locationService.getAll()
        return ResponseEntity.ok(locations)
    }

    override fun apiV1LocationsIdDelete(id: UUID): ResponseEntity<Unit> {
        val user = getCurrentUserFromSecurityContext()
        locationService.deleteById(id, user)
        return ResponseEntity.status(204).build()
    }

    override fun apiV1LocationsIdGet(id: UUID): ResponseEntity<LocationResponse> {
        val location = locationService.getById(id)
        return ResponseEntity.ok(location)
    }

    override fun apiV1LocationsIdPut(id: UUID, locationRequest: LocationRequest): ResponseEntity<LocationResponse> {
        val user = getCurrentUserFromSecurityContext()
        val location = locationService.updateLocation(id, locationRequest, user)
        return ResponseEntity.ok(location)
    }

    override fun apiV1LocationsMyGet(): ResponseEntity<List<LocationResponse>> {
        val user = getCurrentUserFromSecurityContext()
        val locations = locationService.findAllByCreator(user)
        return ResponseEntity.ok(locations)
    }

    override fun apiV1LocationsPost(locationRequest: LocationRequest): ResponseEntity<LocationResponse> {
        val user = getCurrentUserFromSecurityContext()
        val location = locationService.createLocation(locationRequest, user)
        return ResponseEntity.status(201).body(location)
    }
}