package ru.itmo.dws.itmotrip.mapper

import ru.itmo.dws.itmotrip.generated.models.TransportTypeResponse
import ru.itmo.dws.itmotrip.model.TransportType

fun TransportType.toTransportTypeResponse() = TransportTypeResponse(
    id = id,
    logoUrl = logoUrl,
    nameRu = nameRu
)