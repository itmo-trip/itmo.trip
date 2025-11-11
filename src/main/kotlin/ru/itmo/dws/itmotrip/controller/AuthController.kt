package ru.itmo.dws.itmotrip.controller

import api.myitmo.MyItmo
import api.myitmo.model.other.TokenResponse
import api.myitmo.utils.AuthHelper
import jakarta.validation.Valid
import javax.naming.AuthenticationException
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
//import ru.itmo.dws.itmotrip.service.ItmoJwtVerifier
import ru.itmo.dws.itmotrip.service.UserService

@RestController
class AuthController(
//    private val itmoJwtVerifier: ItmoJwtVerifier,
    private val userService: UserService,
//    private val jwtProvider: JwtProvider,
//    private val jwtConfig: JwtConfig,
) {

//    @PostMapping("/itmo-token")
//    @Transactional
//    fun login(@Valid @RequestBody request: ItmoTokenLoginRequest): ResponseEntity<TokenResponse> {
//        val verifiedItmoJwt = itmoJwtVerifier.verifyAndDecode(request.itmoToken)
//        val isu = itmoJwtVerifier.getIsu(verifiedItmoJwt)
//            ?: throw AuthenticationException("ISU ID not found in token.")
//
//        val user = userService.findOrCreateByIsu(isu)
//        val accessToken = jwtProvider.generateAccessToken(user.id)
////        val refreshToken = refreshTokenService.createRefreshToken(user.id)
//
//        val x = TokenResponse()
//        x.accessToken = accessToken
//        return ResponseEntity.ok(x)
//    }

//    @PostMapping("/login")
//    fun loginViaItmo(@RequestBody request: ItmoLoginRequest): ResponseEntity<TokenResponse> {
//        val response = MyItmo().authHelper.auth(request.username, request.password)
//        return ResponseEntity.ok(response)
//    }

    @GetMapping("/")
    fun test(): String {
        return "test"
    }

//    @GetMapping("/")
//    fun profile(@AuthenticationPrincipal user: OAuth2): String {
//        return "test"
//    }
}

data class ItmoTokenLoginRequest(
    val itmoToken: String,
)

data class ItmoLoginRequest(
    val username: String,
    val password: String,
)