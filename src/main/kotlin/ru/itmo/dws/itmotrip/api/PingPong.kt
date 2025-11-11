package ru.itmo.dws.itmotrip.api

import api.myitmo.MyItmo
import api.myitmo.model.other.TokenResponse
import api.myitmo.utils.AuthHelper
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class PingPong(
    private val myItmo: MyItmo,
    private val authHelper: AuthHelper,
) {

    // потестить сесюру
    @GetMapping("/ping")
    fun ping(): String {
        return "pong"
    }

    @PostMapping("/auth")
    fun auth(@RequestBody request: Request): TokenResponse {
        val x = authHelper.auth(request.username, request.password)
        return x
    }

}

data class Request(
    val username: String,
    val password: String,
) {

}
