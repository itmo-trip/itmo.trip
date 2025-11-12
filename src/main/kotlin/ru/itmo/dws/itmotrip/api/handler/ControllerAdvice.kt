package ru.itmo.dws.itmotrip.api.handler

import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import ru.itmo.dws.itmotrip.model.exception.ItmoTripException
import ru.itmo.dws.itmotrip.model.exception.NotFoundException

@RestControllerAdvice
class ControllerAdvice : ResponseEntityExceptionHandler() {

    @ExceptionHandler(NotFoundException::class)
    fun handleNotFoundException(ex: NotFoundException): ProblemDetail {
        val detail = ProblemDetail.forStatusAndDetail(ex.statusCode, ex.message)
        return detail
    }

    @ExceptionHandler(ItmoTripException::class)
    fun handleCaseModuleException(ex: ItmoTripException): ProblemDetail {
        val detail = ProblemDetail.forStatusAndDetail(ex.statusCode, ex.message)
        logger.error(ex.message ?: "Something went wrong", ex)
        return detail
    }

    @ExceptionHandler(Exception::class)
    fun handleServerException(ex: Exception): ProblemDetail {
        val msg = "Something went wrong"
        val detail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, msg)
        logger.error(msg, ex)
        return detail
    }
}
