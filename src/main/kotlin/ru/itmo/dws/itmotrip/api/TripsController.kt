package ru.itmo.dws.itmotrip.api

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import ru.itmo.dws.itmotrip.generated.apis.TripsApiDelegate
import ru.itmo.dws.itmotrip.generated.models.TripRequest
import ru.itmo.dws.itmotrip.generated.models.TripResponse
import ru.itmo.dws.itmotrip.service.TripService
import ru.itmo.dws.itmotrip.util.getCurrentUserFromSecurityContext
import java.util.UUID

@Component
class TripsController(private val tripsService: TripService) : TripsApiDelegate {

    override fun apiV1TripsGet(
        arrivalTime: String?,
        departureTime: String?,
        arrivalLocationId: UUID?,
        departureLocationId: UUID?,
        transportTypeId: Long?
    ): ResponseEntity<List<TripResponse>> {
        return super.apiV1TripsGet(arrivalTime, departureTime, arrivalLocationId, departureLocationId, transportTypeId)
    }

    override fun apiV1TripsIdDelete(id: UUID): ResponseEntity<Unit> {
        val user = getCurrentUserFromSecurityContext()
        tripsService.deleteById(id, user)
        return ResponseEntity.status(204).build()
    }

    override fun apiV1TripsIdGet(id: UUID): ResponseEntity<TripResponse> {
        return ResponseEntity.ok(tripsService.getById(id))
    }

    override fun apiV1TripsIdPut(id: UUID, tripRequest: TripRequest): ResponseEntity<TripResponse> {
        return super.apiV1TripsIdPut(id, tripRequest)
    }

    override fun apiV1TripsPost(tripRequest: TripRequest): ResponseEntity<TripResponse> {
        val user = getCurrentUserFromSecurityContext()
        val trip = tripsService.createTrip(tripRequest, user)
        return ResponseEntity.status(201).body(trip)
    }
}
