package org.schaedler.security

import io.quarkus.vertx.web.RouteFilter
import io.vertx.ext.web.RoutingContext
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import org.schaedler.controllers.RestClient
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import kotlin.math.log

@ApplicationScoped
class TokenValidationFilter{

    @Inject
    lateinit var restClient: RestClient

    private val logger: Logger = LoggerFactory.getLogger(TokenValidationFilter::class.java)

   /* @RouteFilter(1000)
    fun filter(routingContext: RoutingContext) {
        val authorizationHeader = routingContext.request().getHeader("Authorization")
        val tokenValue = authorizationHeader?.substring("Bearer".length)?.trim() ?: ""
        logger.info("token -------- $tokenValue")
    // if (restClient.isTokenValid(tokenValue)) {
            routingContext.next()
   /*  } else {
          routingContext.response().setStatusCode(401).end()
       }*/
   }*/

    /*@RouteFilter(1000)
    fun filter(routingContext: RoutingContext) {
        val authorizationHeader = routingContext.request().getHeader("Authorization")
        val headers = routingContext.request().headers()
        logger.info("Headers: $headers")

        if (authorizationHeader.isNullOrBlank()) {
            logger.warn("Authorization header is missing or blank")
            routingContext.response().setStatusCode(401).end()
        } else {
            val tokenValue = authorizationHeader.substringAfter("Bearer").trim()
            logger.info("token -------- $tokenValue")
            if(this.restClient.isTokenValid(tokenValue)){
                logger.info("Token is valid: $tokenValue")
            }else{
                logger.warn("Invalid token or empty token value: $tokenValue")
                routingContext.response().setStatusCode(401).end()
            }
        }
        routingContext.next()
    }*/


    /*@RouteFilter(1000)
    fun filter(routingContext: RoutingContext) {
        try {

            val authorizationHeader = routingContext.request().getHeader("Authorization")

            val headers = routingContext.request().headers()
            logger.info("Headers: $headers")

            if (authorizationHeader.isNullOrBlank()) {
                logger.warn("Authorization header is missing or blank")
                routingContext.response().setStatusCode(401).end()
            } else {
                val tokenValue = authorizationHeader.substringAfter("Bearer").trim()
                logger.info("Extracted token: $tokenValue")

                if (this.restClient.isTokenValid(tokenValue)) {
                    logger.info("Token is valid: $tokenValue")
                } else {
                    logger.warn("Invalid token or empty token value: $tokenValue")
                    routingContext.response().setStatusCode(401).end()
                }
            }
        } catch (e: Exception) {
            // Log any unexpected exceptions
            logger.error("Error processing request: ${e.message}", e)
            routingContext.response().setStatusCode(500).end()
        } finally {
            // Log the completion of request processing
            logger.info("Request processing completed")

        }
    }*/



}
