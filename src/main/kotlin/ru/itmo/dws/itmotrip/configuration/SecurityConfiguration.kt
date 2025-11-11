package ru.itmo.dws.itmotrip.configuration

import java.nio.charset.StandardCharsets
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException
import java.security.SecureRandom
import java.util.*
import java.util.function.Consumer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest
import org.springframework.security.web.SecurityFilterChain
import ru.itmo.dws.itmotrip.client.my.itmo.CustomAuthorizationRequestResolver

@Configuration
@EnableWebSecurity(debug = true)
class SecurityConfig(
//    private val jwtAuthFilter: JwtAuthFilter
) {

    private val values: MutableMap<Any, Any> = mutableMapOf()
//    private val codeVerifier: String = generateCodeVerifier()

    @Bean
    fun securityFilterChain(http: HttpSecurity, clientRegistrationRepository: ClientRegistrationRepository): SecurityFilterChain {
        http
            .csrf { it.disable() }
//            .oauth2Login { oauth2 ->
//                oauth2
//            }
            .authorizeHttpRequests { auth ->
                auth
//                    .requestMatchers("/login", "/login/callback").permitAll()
//                    .requestMatchers("/api/auth/**").permitAll()
//                    .requestMatchers("/api/app/**").permitAll()
                    .anyRequest().fullyAuthenticated()
            }
            .oauth2Login { oauth2 ->
                oauth2
                    .defaultSuccessUrl("/")
            }
//                oauth2.authorizationEndpoint { auth ->
//                    auth.authorizationRequestResolver(
//                        CustomAuthorizationRequestResolver(
//                            clientRegistrationRepository,
//                            "/oauth2/authorization"
//                        )
//                    )
//                }
//            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
//            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }

    private fun generateCodeVerifier(): String {
        val secureRandom = SecureRandom()
        val codeVerifier = ByteArray(32)
        secureRandom.nextBytes(codeVerifier)
        return Base64.getUrlEncoder().withoutPadding().encodeToString(codeVerifier)
    }

    private fun getCodeChallenge(codeVerifier: String): String {
        val bytes = codeVerifier.toByteArray(StandardCharsets.UTF_8)

        val messageDigest: MessageDigest
        try {
            messageDigest = MessageDigest.getInstance("SHA-256")
        } catch (e: NoSuchAlgorithmException) {
            throw RuntimeException(e)
        }

        val digest = messageDigest.digest(bytes)
        return Base64.getUrlEncoder().withoutPadding().encodeToString(digest)
    }

//    @Bean
//    fun webClientReactiveAuthorizationCodeTokenResponseClient():
//            WebClientReactiveAuthorizationCodeTokenResponseClient {
//
//        val client = WebClientReactiveAuthorizationCodeTokenResponseClient()
//
//        client.setParametersConverter { source ->
//            val parameters = LinkedMultiValueMap<String, String>()
//            parameters.add("grant_type", source.grantType.value)
//            parameters.add("code", source.authorizationExchange.authorizationResponse.code)
//            parameters.add("redirect_uri", source.authorizationExchange.authorizationRequest.redirectUri)
//            parameters.add("client_id", source.clientRegistration.clientId)
//
//            // 🔥 ВАЖНО: добавить code_verifier
//            val codeVerifier = source.authorizationExchange.authorizationRequest.attributes["code_verifier"] as? String
//            if (codeVerifier != null) {
//                parameters.add("code_verifier", codeVerifier)
//            }
//
//            parameters
//        }
//
//        return client
//    }
}