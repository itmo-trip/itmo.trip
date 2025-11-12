package ru.itmo.dws.itmotrip.security.jwt

import com.auth0.jwk.JwkProvider
import com.auth0.jwk.JwkProviderBuilder
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import jakarta.annotation.PostConstruct
import java.net.URI
import java.security.interfaces.RSAPublicKey
import java.util.concurrent.TimeUnit
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import ru.itmo.dws.itmotrip.model.JwtModel

@Service
class ItmoJwtVerifier {

    @Value("\${id.itmo.jwks-url}")
    private lateinit var jwksUrl: String

    @Value("\${id.itmo.issuer}")
    private lateinit var issuer: String

    private lateinit var jwkProvider: JwkProvider

    @PostConstruct
    fun init() {
        this.jwkProvider = JwkProviderBuilder(URI(jwksUrl).toURL())
            .cached(10, 7, TimeUnit.DAYS)
            .build()
    }

    fun verifyAndDecode(token: String): DecodedJWT {
        val decodedJWT = JWT.decode(token)
        val keyId = decodedJWT.keyId
        val jwk = jwkProvider.get(keyId)
        val algo = Algorithm.RSA256(jwk.publicKey as RSAPublicKey, null)
        val verifier = JWT.require(algo)
            .withIssuer(issuer)
            .acceptLeeway(60)
            .build()

        return verifier.verify(decodedJWT)
    }

    fun parseJWTToModel(decodedJWT: DecodedJWT): JwtModel {
        val isu = decodedJWT.getClaim("isu")?.asInt()
            ?: throw RuntimeException("Can't get isu from token")
        val givenName = decodedJWT.getClaim("given_name")?.asString()
            ?: throw RuntimeException("Can't get givenName from token")
        val familyName = decodedJWT.getClaim("family_name")?.asString()
            ?: throw RuntimeException("Can't get familyName from token")

        val middleName = decodedJWT.getClaim("middle_name")?.asString()

        val picture = decodedJWT.getClaim("picture")?.asString()

        val groups = decodedJWT.getClaim("groups")?.asList(Map::class.java)
        val facultyName = if (!groups.isNullOrEmpty()) {
            val firstGroup = groups.first()
            val faculty = firstGroup["faculty"] as? Map<*, *>
            faculty?.get("short_name") as? String ?: faculty?.get("name") as? String ?: ""
        } else ""

        return JwtModel(
            isuId = isu,
            faculty = facultyName,
            givenName = givenName,
            familyName = familyName,
            middleName = middleName,
            picture = picture
        )
    }
}