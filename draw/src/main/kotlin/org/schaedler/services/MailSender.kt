package org.schaedler.services


import io.quarkus.mailer.Mail
import io.quarkus.mailer.Mailer
import io.quarkus.qute.Template
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import org.eclipse.microprofile.config.inject.ConfigProperty
import org.schaedler.dto.contactDTO
import org.schaedler.entities.Draws
import org.schaedler.respositories.PlayersRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory



@ApplicationScoped
class MailSender {

    @Inject
    lateinit var mailer: Mailer

    private val logger: Logger = LoggerFactory.getLogger(MailSender::class.java)

    @ConfigProperty(name = "MAIL_BOX")
    lateinit var mailBox: String

    @Inject
    lateinit var newDraw: Template

    @Inject
    lateinit var newDrawToGamePlayers: Template

    @Inject
    lateinit var newContact: Template

    @Inject
    lateinit var playersRepository: PlayersRepository



    fun sendEmailToDrawnPlayer(draw: Draws) {
        val nexDrawInstance = newDraw.instance()
        nexDrawInstance.data(
            mapOf(
                "playerName" to (draw.player?.playerName),
                "gameName" to (draw.game?.gameName)
            )
        )
        val nexDrawContent = nexDrawInstance.render()
        val mail = Mail.withHtml(
            draw.player?.playerEmail,
            "You have been drawn for the game ${draw.game?.gameName}",
            nexDrawContent
        )
        mailer.send(mail)
    }

    fun sendEmailToGamePlayers(draw: Draws) {
        val players = draw.game?.id?.let { playersRepository.findPlayersByGameIdAndIsActive(it) }
        if (players != null) {
            for (player in players) {
                if (player.playerEmail == draw.player?.playerEmail) {
                    continue
                }

                val nexDrawInstance = newDrawToGamePlayers.instance()
                nexDrawInstance.data(
                    mapOf(
                        "playerName" to (player.playerName),
                        "gameName" to (draw.game?.gameName),
                        "drawnPlayerName" to (draw.player?.playerName),
                        "dateDraw" to (draw.createdAt)
                    )
                )
                val nexDrawContent = nexDrawInstance.render()
                val mail = Mail.withHtml(
                    player.playerEmail,
                    "There is a new draw for game ${draw.game?.gameName}",
                    nexDrawContent
                )
                mailer.send(mail)
            }
        }
    }

    fun sendEmailFromContact(contact: contactDTO) {
        val contactInstance = newContact.instance()
        contactInstance.data(
            mapOf(
                "name" to (contact.name),
                "email" to (contact.from),
                "subject" to (contact.subject),
                "message" to (contact.message)
            )
        )
        val contactContent = contactInstance.render()
        val email = Mail.withHtml(
            mailBox,
            "${contact.subject}",
            contactContent
        )
        mailer.send(email)
    }
}