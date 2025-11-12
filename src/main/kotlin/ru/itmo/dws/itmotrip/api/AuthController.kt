package ru.itmo.dws.itmotrip.api

import api.myitmo.model.other.TokenResponse
import api.myitmo.utils.AuthHelper
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.itmo.dws.itmotrip.dto.LoginRequestDto
import ru.itmo.dws.itmotrip.dto.RefreshRequestDto

@RestController
class AuthController(
    private val authHelper: AuthHelper,
) {

    @PostMapping("/auth/login")
    fun login(@RequestBody request: LoginRequestDto): ResponseEntity<TokenResponse> {
        val authResponse = authHelper.auth(request.username, request.password)
        return ResponseEntity.ok(authResponse)
    }

    @PostMapping("/auth/refresh")
    fun refresh(@RequestBody request: RefreshRequestDto): ResponseEntity<TokenResponse> {
        val authResponse = authHelper.refreshTokens(request.refreshToken)
        return ResponseEntity.ok(authResponse)
    }
}