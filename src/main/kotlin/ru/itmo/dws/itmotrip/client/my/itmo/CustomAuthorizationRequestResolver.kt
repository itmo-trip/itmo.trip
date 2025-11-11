package ru.itmo.dws.itmotrip.client.my.itmo

import jakarta.servlet.http.HttpServletRequest
import java.nio.charset.StandardCharsets
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException
import java.util.*
import kotlin.collections.HashMap
import org.springframework.security.crypto.keygen.Base64StringKeyGenerator
import org.springframework.security.crypto.keygen.StringKeyGenerator
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest
import org.springframework.security.oauth2.core.endpoint.PkceParameterNames

open class CustomAuthorizationRequestResolver(
    repo: ClientRegistrationRepository,
    authorizationRequestBaseUri: String?
) : OAuth2AuthorizationRequestResolver {
    private val defaultResolver: OAuth2AuthorizationRequestResolver =
        DefaultOAuth2AuthorizationRequestResolver(repo, authorizationRequestBaseUri)
    private val secureKeyGenerator: StringKeyGenerator =
        Base64StringKeyGenerator(Base64.getUrlEncoder().withoutPadding(), 96)

    override fun resolve(servletRequest: HttpServletRequest): OAuth2AuthorizationRequest? {
        val req = defaultResolver.resolve(servletRequest)
        return customizeAuthorizationRequest(req)
    }

    override fun resolve(
        servletRequest: HttpServletRequest,
        clientRegistrationId: String
    ): OAuth2AuthorizationRequest? {
        val req = defaultResolver.resolve(servletRequest, clientRegistrationId)
        return customizeAuthorizationRequest(req)
    }

    private fun customizeAuthorizationRequest(req: OAuth2AuthorizationRequest?): OAuth2AuthorizationRequest? {
        if (req == null) {
            return null
        }

        val attributes: MutableMap<String, Any> = HashMap(req.attributes)
        val additionalParameters: MutableMap<String, Any> = HashMap(req.additionalParameters)
        addPkceParameters(attributes, additionalParameters)
        return OAuth2AuthorizationRequest.from(req)
            .attributes(attributes)
            .additionalParameters(additionalParameters)
            .build()
    }

    private fun addPkceParameters(attributes: MutableMap<String, Any>, additionalParameters: MutableMap<String, Any>) {
        val codeVerifier = "NIGGA"
        attributes[PkceParameterNames.CODE_VERIFIER] = codeVerifier
        try {
            val codeChallenge = createHash(codeVerifier)
            additionalParameters[PkceParameterNames.CODE_CHALLENGE] = codeChallenge
            additionalParameters[PkceParameterNames.CODE_VERIFIER] = codeVerifier
            additionalParameters[PkceParameterNames.CODE_CHALLENGE_METHOD] = "S256"
        } catch (e: NoSuchAlgorithmException) {
            additionalParameters[PkceParameterNames.CODE_CHALLENGE] = codeVerifier
        }
    }

    companion object {
        @Throws(NoSuchAlgorithmException::class)
        private fun createHash(value: String): String {
            val md: MessageDigest = MessageDigest.getInstance("SHA-256")
            val digest: ByteArray = md.digest(value.toByteArray(StandardCharsets.US_ASCII))
            return Base64.getUrlEncoder().withoutPadding().encodeToString(digest)
        }
    }
}