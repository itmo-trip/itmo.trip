package ru.itmo.dws.itmotrip.mapper

import ru.itmo.dws.itmotrip.generated.models.LocationTypeResponse
import ru.itmo.dws.itmotrip.model.LocationType

fun LocationType.toLocationTypeResponse() = LocationTypeResponse(
    id = id,
    code = code
)