package ru.itmo.dws.itmotrip.configuration

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import java.util.*
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import ru.itmo.dws.itmotrip.model.JwtModel
import ru.itmo.dws.itmotrip.model.User
import ru.itmo.dws.itmotrip.service.MyItmoService
import ru.itmo.dws.itmotrip.service.UserService

@Component
class JwtAuthFilter(
    private val itmoJwtVerifier: ItmoJwtVerifier,
    private val userDetailsService: UserDetailsService,
    private val userService: UserService,
    private val myItmoService: MyItmoService,
) : OncePerRequestFilter() {

    companion object {
        private const val AUTH_HEADER = "Authorization"
        private const val BEARER = "Bearer "
    }

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader(AUTH_HEADER)

        if (authHeader == null || !authHeader.startsWith(BEARER)) {
            filterChain.doFilter(request, response)
            return;
        }

        val token = authHeader.substring(BEARER.length)
        val decoded = itmoJwtVerifier.verifyAndDecode(token)
        val jwtModel = itmoJwtVerifier.parseJWTToModel(decoded)
        val user = buildUser(jwtModel)
        userService.insert(user)
        val userDetails = userDetailsService.loadUserByUsername(user.studentId)

        val authentication = UsernamePasswordAuthenticationToken(
            userDetails, null, userDetails.authorities
        ).apply {
            details = WebAuthenticationDetailsSource().buildDetails(request)
        }
        SecurityContextHolder.getContext().authentication = authentication

        filterChain.doFilter(request, response)
    }

    private fun buildUser(jwtModel: JwtModel): User {
        return User(
            id = UUID.randomUUID(),
            studentId = jwtModel.isuId.toString(),
            faculty = jwtModel.faculty,
            firstName = jwtModel.givenName,
            middleName = jwtModel.middleName,
            lastName = jwtModel.familyName,
            avatarUrl = jwtModel.picture,
            bio = null,
            socialNetworkUsername = "example"
        )
    }
}