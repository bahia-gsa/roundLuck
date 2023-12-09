package org.schaedler.respositories

import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.transaction.Transactional
import org.schaedler.entities.Players

@ApplicationScoped
class PlayersRepository : PanacheRepository<Players> {

    @Transactional
    fun findPlayersByGameId(gameId: Long): List<Players> {
        return find("game.id = ?1", gameId).list()
    }

    fun findPlayersByGameIdAndIsActive(gameId: Long): List<Players> {
        return find("game.id = ?1 and isActive = true", gameId).list()
    }

    fun findPlayersByGameIdAndIsActiveAndDrawn(gameId: Long): List<Players> {
        return find("game.id = ?1 and isActive = true and drawn = false", gameId).list()
    }
    fun updateDrawnStatus(gameId: Long) {
        update("drawn = false where game.id = ?1", gameId)
    }
}