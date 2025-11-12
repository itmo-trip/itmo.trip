package ru.itmo.dws.itmotrip.model.exception

import org.springframework.http.HttpStatus
import java.util.UUID

open class ItmoTripException(
    message: String,
    cause: Throwable? = null,
) : RuntimeException(message, cause) {
    open val statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
}

class UnauthorizedException(message: String, exception: Throwable?) : ItmoTripException(message, exception) {
    override val statusCode: HttpStatus = HttpStatus.UNAUTHORIZED
}

open class NotFoundException(
    entityName: String,
    entityId: String,
) : ItmoTripException("$entityName with id=$entityId not found") {
    override val statusCode: HttpStatus = HttpStatus.NOT_FOUND
}

class UserNotFoundException(id: UUID) : NotFoundException("User", id.toString())
