package org.schaedler.controllers


import jakarta.inject.Inject
import jakarta.transaction.Transactional
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import org.schaedler.dto.DrawDTO
import org.schaedler.entities.Draws
import org.schaedler.respositories.DrawsRepository
import org.schaedler.respositories.PlayersRepository
import org.schaedler.services.MailSender

import java.time.LocalDateTime
import java.util.*


@Path("api/draws")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class DrawsResources {

    @Inject
    lateinit var drawsRepository: DrawsRepository
    @Inject
    lateinit var playersRepository: PlayersRepository
    @Inject
    lateinit var mailSender: MailSender

    @POST
    @Transactional
    fun createDraw(draw: Draws): Draws {
        draw.createdAt = LocalDateTime.now()
        draw.persist()
        return draw
    }

    @GET
    @Path("/{gameId}")
    @Transactional
    fun getDrawsByGame(@PathParam("gameId") gameId: Long): List<DrawDTO> {
        val draws = drawsRepository.findByGameId(gameId)
        return draws.map { draw -> mapDrawToDrawDTO(draw) }
    }

    @GET
    @Path("/draw/{gameId}")
    @Transactional
    fun draw(@PathParam("gameId") gameId: Long): DrawDTO {
        val players = playersRepository.findPlayersByGameIdAndIsActiveAndDrawn(gameId)
        if (players.isNotEmpty()) {
            val random = Random()
            val drawnPlayer = players[random.nextInt(players.size)]
            drawnPlayer.drawn = true
            drawnPlayer.persist()
            val draw = Draws()
            draw.createdAt = LocalDateTime.now()
            draw.game = drawnPlayer.game
            draw.player = drawnPlayer
            draw.persist()
            mailSender.sendEmailToDrawnPlayer(draw)
            mailSender.sendEmailToGamePlayers(draw)
            return mapDrawToDrawDTO(draw)
        } else {
            renewDrawnStatus(gameId)
            return draw(gameId)
        }
    }

    @Transactional
    fun renewDrawnStatus(gameId: Long) {
        playersRepository.update("drawn = false WHERE game.id = ?1", gameId)
    }

    fun mapDrawToDrawDTO(draw: Draws): DrawDTO {
        val drawDTO = DrawDTO()
        drawDTO.playerName = draw.player?.playerName
        drawDTO.createdAt = draw.createdAt
        return drawDTO
    }

}