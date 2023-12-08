package org.schaedler.security

import io.quarkus.vertx.web.RouteFilter
import io.vertx.ext.web.RoutingContext
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import org.schaedler.controllers.RestClient
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@ApplicationScoped
class TokenValidationFilter{

    @Inject
    lateinit var restClient: RestClient

    private val logger: Logger = LoggerFactory.getLogger(TokenValidationFilter::class.java)

    @RouteFilter(1000)
    fun filter(routingContext: RoutingContext) {
        if (restClient.isTokenValid(extractToken(routingContext))) {
            routingContext.next()
        } else {
            routingContext.response().setStatusCode(401).end()
        }
   }
   fun extractToken(routingContext: RoutingContext): String {
        val authorizationHeader = routingContext.request().headers().get("Authorization")
        return authorizationHeader.substring("Bearer".length).trim()
    }

}
