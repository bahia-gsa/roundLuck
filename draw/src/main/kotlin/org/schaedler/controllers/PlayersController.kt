package org.schaedler.controllers


import jakarta.inject.Inject
import jakarta.transaction.Transactional
import jakarta.validation.Valid
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import org.schaedler.dto.PlayersDTO
import org.schaedler.entities.Players
import org.schaedler.respositories.PlayersRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDateTime


@Path("api/players")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class PlayersController {


    @Inject
    lateinit var playersRepository: PlayersRepository

    private val logger: Logger = LoggerFactory.getLogger(PlayersController::class.java)


    @POST
    @Transactional
    fun createPlayer(@Valid player: Players): Response {
        player.createdAt = LocalDateTime.now()
        player.drawn = false
        player.isActive = true
        player.persist()
        return Response.ok(mapPlayersToPlayerDTO(player)).build()
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    fun deletePlayer(@PathParam("id") id: Long): Response {
        val existingPlayer = playersRepository.findById(id)
        return if (existingPlayer != null) {
            existingPlayer.isActive = false
            playersRepository.persist(existingPlayer)
            val playerDTO = mapPlayersToPlayerDTO(existingPlayer)

            // Log the details of the player being persisted
            logger.info("Persisting player with ID: $id, Name: ${existingPlayer.id}, is ACTIVE: ${existingPlayer.isActive}.")

            Response.ok(playerDTO).build()
        } else {
            Response.status(Response.Status.NOT_FOUND)
                .entity("Player with ID $id not found")
                .build()
        }
    }

    @GET
    @Path("/{gameId}")
    fun getPlayersByGameId(@PathParam("gameId") gameId: Long): List<PlayersDTO> {
        val players: List<Players> = playersRepository.findPlayersByGameIdAndIsActive(gameId)
        return players.map { mapPlayersToPlayerDTO(it) }
    }

    @PATCH
    @Path("/{id}")
    @Transactional
    fun inactivatePlayer(@PathParam("id") id: Long): Response {
        val existingPlayer = playersRepository.findById(id)
        if (existingPlayer != null) {
            existingPlayer.isActive = false
            existingPlayer.persist()
            return Response.ok("Player with ID $id was updated successfully").build()
        } else {
            throw WebApplicationException("Player with ID $id not found", 404)
        }
    }

    private fun mapPlayersToPlayerDTO(player: Players): PlayersDTO {
        return PlayersDTO(
            id = player.id,
            playerName = player.playerName,
            gameId = player.game?.id,
            playerEmail = player.playerEmail,
            drawn = player.drawn,
            active = player.isActive,
            createdAt = player.createdAt
        )
    }


}