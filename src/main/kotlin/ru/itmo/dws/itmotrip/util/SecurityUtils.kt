package ru.itmo.dws.itmotrip.util

import org.springframework.security.core.context.SecurityContextHolder.getContext
import ru.itmo.dws.itmotrip.model.User
import ru.itmo.dws.itmotrip.model.exception.ItmoTripException

fun getCurrentUserFromSecurityContext(): User {
    return getContext().authentication.principal as? User
        ?: throw ItmoTripException("Failed to cast principal to User")
}
