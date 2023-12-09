package org.schaedler.entities


import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
open class Draws : PanacheEntity(){

    @ManyToOne
    open var player: Players? = null

    @ManyToOne
    @JoinColumn(name = "game_id")
    open var game: Games? = null

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP")
    open var createdAt: LocalDateTime? = null
}