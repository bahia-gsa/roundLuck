package org.schaedler.controllers

import io.quarkus.vertx.web.Body
import jakarta.inject.Inject
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response


import org.eclipse.microprofile.jwt.Claims
import org.eclipse.microprofile.jwt.JsonWebToken
import org.jose4j.jws.AlgorithmIdentifiers
import org.jose4j.jws.JsonWebSignature
import org.jose4j.jwt.JwtClaims
import org.jose4j.jwt.NumericDate
import org.jose4j.jwt.consumer.JwtConsumer
import org.jose4j.jwt.consumer.JwtConsumerBuilder
import org.jose4j.keys.HmacKey
import org.jose4j.lang.JoseException
import java.util.*

@Path("api/teste")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class Teste {

    private val secretKey = "yourSecretKey"


    @Inject
    lateinit var restClient: RestClient

    @GET
    fun getTeste(): String {
        return "Teste"
    }

    @POST
    fun postTeste(@Body token: String): Response {
        if(!this.restClient.isTokenValid(token){
            return Response.status(401).build()
        }
        return Response.ok(generateJwt("teste")).build()
    }

    fun generateJwt(username: String): String {
        val claims = JwtClaims()
        claims.setClaim(Claims.upn.name, username)
        claims.setClaim(Claims.groups.name, listOf("user"))
        claims.expirationTime = NumericDate.fromMilliseconds(Date().time + 60000)
        claims.issuedAt = NumericDate.now()

        val jws = JsonWebSignature()
        jws.payload = claims.toJson()
        jws.key = HmacKey(secretKey.toByteArray())
        jws.algorithmHeaderValue = AlgorithmIdentifiers.HMAC_SHA256

        return try {
            jws.compactSerialization
        } catch (e: JoseException) {
            throw RuntimeException(e)
        }
    }
}