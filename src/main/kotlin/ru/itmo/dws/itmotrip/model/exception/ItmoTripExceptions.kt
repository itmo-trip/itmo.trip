package ru.itmo.dws.itmotrip.model.exception

import java.util.UUID

open class ItmoTripException(
    message: String,
    cause: Throwable? = null,
) : RuntimeException(message, cause) {
    open val statusCode: Int = 500
}

open class NotFoundException(
    entityName: String,
    entityId: String,
) : ItmoTripException("$entityName with id=$entityId not found") {
    override val statusCode: Int = 404
}

class UserNotFoundException(id: UUID) : NotFoundException("User", id.toString())
