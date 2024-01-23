package org.schaedler.respositories

import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import org.schaedler.entities.Draws

@ApplicationScoped
class DrawsRepository : PanacheRepository<Draws> {

    fun findByGameId(gameId: Long): List<Draws> {
        return find("game.id", gameId).list()
    }
}