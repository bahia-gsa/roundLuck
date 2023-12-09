package org.schaedler.controllers

import jakarta.inject.Inject
import jakarta.transaction.Transactional
import jakarta.validation.Valid
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import org.schaedler.entities.Games
import org.schaedler.respositories.DrawsRepository
import org.schaedler.respositories.GameRepository
import org.schaedler.respositories.PlayersRepository
import java.time.LocalDateTime

@Path("api/games")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class GameController {
    @Inject
    lateinit var gameRepository: GameRepository
    @Inject
    lateinit var playersRepository: PlayersRepository
    @Inject
    lateinit var drawsRepository: DrawsRepository

    @POST
    @Transactional
    fun createGame(@Valid game: Games): Response {
        game.createdAt = LocalDateTime.now()
        game.persist()
        return Response.ok(game).build()
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    fun deleteGame(@PathParam("id") id: Long): Response {
        return try {
            val existingGame = gameRepository.findById(id)
            val existingPlayersForThisGame = playersRepository.findPlayersByGameId(id)
            val existingDrawsForThisGame = drawsRepository.findByGameId(id)
            existingGame?.delete()
            existingPlayersForThisGame.forEach { it.delete() }
            existingDrawsForThisGame.forEach { it.delete() }
            Response.ok().build()
        } catch (e: Exception) {
            Response.status(404).build()
        }
    }

    @GET
    fun getGames(): List<Games> {
        return gameRepository.listAll()
    }

    @GET
    @Path("/{id}")
    @Transactional
    fun getGame(@PathParam("id") id: Long): Games {
        val existingGame = gameRepository.findById(id)
        if (existingGame != null) {
            return existingGame
        } else {
            throw WebApplicationException("Game with ID $id not found", 404)
        }
    }

    @GET
    @Path("/user/{id}")
    @Transactional
    fun getGamesByUserId(@PathParam("id") id: Long): List<Games> {
        val existingGames = gameRepository.findByUserId(id)
        if (existingGames != null) {
            return existingGames
        } else {
            throw WebApplicationException("Games with user ID $id not found", 404)
        }
    }

    fun checkExistingGame(gameName: String): Boolean {
        val existingGame = gameRepository.findByName(gameName)
        if (existingGame != null) {
            return true
        }
        return false
    }
}