package ru.itmo.dws.itmotrip.mapper

import ru.itmo.dws.itmotrip.generated.models.LocationResponse
import ru.itmo.dws.itmotrip.generated.models.TransportTypeResponse
import ru.itmo.dws.itmotrip.generated.models.TripRequest
import ru.itmo.dws.itmotrip.generated.models.TripResponse
import ru.itmo.dws.itmotrip.generated.models.UserResponse
import ru.itmo.dws.itmotrip.model.Trip
import ru.itmo.dws.itmotrip.model.Trip.TripStatus
import ru.itmo.dws.itmotrip.util.DateUtils.toUtcLocalDateTime
import java.time.ZoneId
import java.util.UUID

fun Trip.toTripResponse(
    creator: UserResponse,
    transportType: TransportTypeResponse,
    arrivalLocation: LocationResponse,
    departureLocation: LocationResponse,
): TripResponse = TripResponse(
    id = id,
    creator = creator,
    seriesId = seriesId,
    departureTime = departureTime?.atZone(ZoneId.of("UTC"))?.toOffsetDateTime(),
    arrivalTime = arrivalTime?.atZone(ZoneId.of("UTC"))?.toOffsetDateTime(),
    status = status.name,
    comment = comment,
    transportType = transportType,
    arrivalLocation = arrivalLocation,
    departureLocation = departureLocation
)

fun TripRequest.toTrip(
    id: UUID,
    creatorId: UUID,
    status: TripStatus,
): Trip = Trip(
    id = id,
    creatorId =  creatorId,
    seriesId = null, // poka tak
    transportTypeId = transportTypeId,
    departureTime = departureTime?.toUtcLocalDateTime(),
    arrivalTime = arrivalTime?.toUtcLocalDateTime(),
    departureLocationId = departureLocationId,
    arrivalLocationId = arrivalLocationId,
    status = status,
    comment = comment
)