package ru.itmo.dws.itmotrip.security.filter

import api.myitmo.model.personality.Personality
import com.auth0.jwt.exceptions.TokenExpiredException
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import java.time.LocalDateTime
import java.util.*
import okhttp3.internal.UTC
import org.springframework.http.HttpStatus
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
import ru.itmo.dws.itmotrip.security.jwt.ItmoJwtVerifier

@Component
class JwtAuthFilter(
    private val itmoJwtVerifier: ItmoJwtVerifier,
    private val userDetailsService: UserDetailsService,
    private val userService: UserService,
    private val myItmoService: MyItmoService,
) : OncePerRequestFilter() {

    companion object {
        private const val AUTH_HEADER = "Authorization"
        private const val REFRESH_TOKEN = "Refresh"
        private const val BEARER = "Bearer "
    }

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader(AUTH_HEADER)
        val refreshHeader = request.getHeader(REFRESH_TOKEN)

        if (authHeader == null || !authHeader.startsWith(BEARER)) {
            filterChain.doFilter(request, response)
            return
        }

        if (refreshHeader != null) {
            myItmoService.getMyItmo().storage.refreshToken = refreshHeader
        }

        val token = authHeader.substring(BEARER.length)
        try {
            val decoded = itmoJwtVerifier.verifyAndDecode(token)
            val jwtModel = itmoJwtVerifier.parseJWTToModel(decoded)
            val personalityFromMyItmo = myItmoService.getPersonByIsuId(jwtModel.isuId)
            val user = buildUser(jwtModel, personalityFromMyItmo)
            userService.create(user)
            val userDetails = userDetailsService.loadUserByUsername(user.studentId)

            if (SecurityContextHolder.getContext().authentication == null) {
                val authentication = UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.authorities
                ).apply {
                    details = WebAuthenticationDetailsSource().buildDetails(request)
                }
                SecurityContextHolder.getContext().authentication = authentication
            }

            filterChain.doFilter(request, response)
        } catch (e: TokenExpiredException) {
            response.status = HttpStatus.FORBIDDEN.value()
            response.writer.write("Your token has expired on ${LocalDateTime.ofInstant(e.expiredOn, UTC.toZoneId())}")
            return
        }
    }

    private fun buildUser(jwtModel: JwtModel, personality: Personality): User {
        val webLink = personality.contacts
            .firstOrNull {
                it.contactAlias.equals("web")
            }
            ?.contact
            ?.firstOrNull()
        return User(
            id = UUID.randomUUID(),
            studentId = jwtModel.isuId.toString(),
            faculty = jwtModel.faculty,
            firstName = jwtModel.givenName,
            middleName = jwtModel.middleName,
            lastName = jwtModel.familyName,
            avatarUrl = jwtModel.picture,
            bio = null,
            socialNetworkUsername = webLink
        )
    }
}