package org.schaedler.controllers

import jakarta.inject.Inject
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import org.schaedler.dto.contactDTO
import org.schaedler.services.MailSender

@Path("api/contact")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class ContactController {

    @Inject
    lateinit var mailSender: MailSender


    @POST
    fun sendMail(contact: contactDTO){
        mailSender.sendEmailFromContact(contact)
    }

}