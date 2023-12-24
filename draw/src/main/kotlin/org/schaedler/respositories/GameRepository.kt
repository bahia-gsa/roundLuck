package org.schaedler.respositories

import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import org.schaedler.entities.Games

@ApplicationScoped
class GameRepository: PanacheRepository<Games> {

    fun findByUserId(userId: Long): List<Games> {
        return find("userId", userId).list()
    }

    fun findByName(gameName: String): Games? {
        return find("gameName", gameName).firstResult()
    }
}