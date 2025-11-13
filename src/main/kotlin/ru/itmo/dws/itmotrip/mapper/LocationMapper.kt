package ru.itmo.dws.itmotrip.mapper

import ru.itmo.dws.itmotrip.generated.models.LocationRequest
import ru.itmo.dws.itmotrip.generated.models.LocationResponse
import ru.itmo.dws.itmotrip.generated.models.LocationTypeResponse
import ru.itmo.dws.itmotrip.generated.models.UserResponse
import ru.itmo.dws.itmotrip.model.Location
import java.util.UUID

fun Location.toLocationResponse(type: LocationTypeResponse, creator: UserResponse? = null) = LocationResponse(
    id = id,
    name = name,
    locationType = type,
    latitude = latitude,
    longitude = longitude,
    creator = creator
)

fun LocationRequest.toLocation(id: UUID, creatorId: UUID) = Location(
    id = id,
    creatorId = creatorId,
    locationTypeId = locationTypeId,
    name = name,
    latitude = latitude,
    longitude = longitude
)