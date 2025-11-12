package ru.itmo.dws.itmotrip.api

import api.myitmo.model.other.TokenResponse
import api.myitmo.utils.AuthHelper
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import ru.itmo.dws.itmotrip.generated.apis.AuthApiDelegate
import ru.itmo.dws.itmotrip.generated.models.LoginRequest
import ru.itmo.dws.itmotrip.generated.models.LoginResponse
import ru.itmo.dws.itmotrip.generated.models.RefreshRequest

@Component
class AuthController(private val authHelper: AuthHelper) : AuthApiDelegate {

    override fun apiV1AuthLoginPost(loginRequest: LoginRequest): ResponseEntity<LoginResponse> {
        val authResponse = authHelper.auth(loginRequest.username, loginRequest.password)
        return ResponseEntity.ok(authResponse.toLoginResponse())
    }

    override fun apiV1AuthRefreshPost(refreshRequest: RefreshRequest): ResponseEntity<LoginResponse> {
        val authResponse = authHelper.refreshTokens(refreshRequest.refreshToken)
        return ResponseEntity.ok(authResponse.toLoginResponse())
    }

    private fun TokenResponse.toLoginResponse() = LoginResponse(
        accessToken = accessToken,
        expiresIn = expiresIn,
        refreshToken = refreshToken,
        refreshExpiresIn = refreshExpiresIn,
        idToken = idToken,
        sessionState = sessionState,
    )
}
