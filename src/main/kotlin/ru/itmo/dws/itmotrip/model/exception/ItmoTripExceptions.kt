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

class ForbiddenException(
    userId: UUID
) : ItmoTripException("User with id=$userId is not allowed to perform this action") {
    override val statusCode: HttpStatus = HttpStatus.FORBIDDEN
}

class BadRequestException(message: String) : ItmoTripException(message) {
    override val statusCode: HttpStatus = HttpStatus.BAD_REQUEST
}

open class NotFoundException(
    entityName: String,
    entityId: String,
) : ItmoTripException("$entityName with id=$entityId not found") {
    override val statusCode: HttpStatus = HttpStatus.NOT_FOUND
}

class UserNotFoundException(id: UUID) : NotFoundException("User", id.toString())
class TripNotFoundException(id: UUID) : NotFoundException("Trip", id.toString())
class LocationNotFoundException(id: UUID) : NotFoundException("Location", id.toString())
class LocationTypeNotFoundException(id: Long) : NotFoundException("Location type", id.toString())
class TransportTypeNotFoundException(id: Long) : NotFoundException("Transport type", id.toString())
