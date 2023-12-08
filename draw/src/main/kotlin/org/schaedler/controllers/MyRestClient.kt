package org.schaedler.controllers

import jakarta.enterprise.context.ApplicationScoped
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient


@RegisterRestClient
@Path("/")
interface MyRestClient {

    @GET
    @Path("/endpoint")
    @Produces(MediaType.APPLICATION_JSON)
    fun getResponse(): String
}