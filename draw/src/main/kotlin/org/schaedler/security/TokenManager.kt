package org.schaedler.security

import com.fasterxml.jackson.databind.ObjectMapper
import io.quarkus.security.Authenticated
import io.smallrye.jwt.build.Jwt
import jakarta.inject.Inject
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import org.schaedler.controllers.RestClient
import org.schaedler.entities.UserLogged
import org.slf4j.Logger
import org.slf4j.LoggerFactory


@Path("api/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class TokenManager {

    @Inject
    lateinit var restClient: RestClient

    private val logger: Logger = LoggerFactory.getLogger(TokenManager::class.java)


    @GET
    @Path("user")
    @Authenticated
    fun getTeste(): String {
        return "Teste"
    }

    @POST
    @Path("authenticate")
    fun authentication(input: String): Response {
        val objectMapper = ObjectMapper()
        val userLogged: UserLogged = objectMapper.readValue(input, UserLogged::class.java)
        if(!this.restClient.isTokenValid(userLogged.token)){
            return Response.status(401).build()
        }
        return Response.ok(generateJWT(userLogged)).build()
    }

    fun generateJWT(user: UserLogged): String {
        return Jwt.issuer("Draw App")
            .upn(user.email)
            .groups(setOf("user"))
            .expiresIn(1200)
            .sign()
    }
}