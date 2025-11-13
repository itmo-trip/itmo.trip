package ru.itmo.dws.itmotrip.api

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import ru.itmo.dws.itmotrip.generated.apis.LocationsApiDelegate
import ru.itmo.dws.itmotrip.generated.models.LocationRequest
import ru.itmo.dws.itmotrip.generated.models.LocationResponse
import ru.itmo.dws.itmotrip.service.LocationService
import java.util.UUID

@Component
class LocationController(private val locationService: LocationService) : LocationsApiDelegate {

    override fun apiV1LocationsGet(): ResponseEntity<List<LocationResponse>> {
        return super.apiV1LocationsGet()
    }

    override fun apiV1LocationsIdDelete(id: UUID): ResponseEntity<Unit> {
        return super.apiV1LocationsIdDelete(id)
    }

    override fun apiV1LocationsIdGet(id: UUID): ResponseEntity<LocationResponse> {
        val location = locationService.getById(id)
        return ResponseEntity.ok(location)
    }

    override fun apiV1LocationsIdPut(id: UUID, locationRequest: LocationRequest): ResponseEntity<LocationResponse> {
        return super.apiV1LocationsIdPut(id, locationRequest)
    }

    override fun apiV1LocationsMyGet(): ResponseEntity<List<LocationResponse>> {
        return super.apiV1LocationsMyGet()
    }

    override fun apiV1LocationsPost(locationRequest: LocationRequest): ResponseEntity<LocationResponse> {
        return super.apiV1LocationsPost(locationRequest)
    }
}
