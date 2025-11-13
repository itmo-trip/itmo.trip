package ru.itmo.dws.itmotrip.api

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import ru.itmo.dws.itmotrip.generated.apis.TransportTypesApiDelegate
import ru.itmo.dws.itmotrip.generated.models.TransportTypeResponse
import ru.itmo.dws.itmotrip.service.TransportTypeService

@Component
class TransportTypeController(private val transportTypeService: TransportTypeService) : TransportTypesApiDelegate {

    override fun apiV1TransportTypesGet(): ResponseEntity<List<TransportTypeResponse>> {
        val transportTypes = transportTypeService.getAll()
        return ResponseEntity.ok(transportTypes)
    }
}