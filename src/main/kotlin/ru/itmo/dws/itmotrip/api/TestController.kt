package ru.itmo.dws.itmotrip.api

import java.util.*
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import ru.itmo.dws.itmotrip.model.User
import ru.itmo.dws.itmotrip.service.UserService

@RestController
class TestController(
    private val userService: UserService,
) {

    @GetMapping("/me")
    fun getMe(@AuthenticationPrincipal userDetails: UserDetails): User {
        val user = userService.getById(UUID.fromString(userDetails.username))
        return user
    }
}