package org.schaedler.entities

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.*
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import java.time.LocalDateTime

@Entity
open class Players : PanacheEntity(){

    @field:NotBlank(message = "Player name must not be blank")
    @field:Size(min = 2, max = 20, message = "Player name length must be between 2 and 20 characters")
    var playerName: String? = null

    @field:NotBlank(message = "Player email must not be blank")
    @field:Email(message = "Player email must be a valid email address")
    var playerEmail: String? = null

    @ManyToOne
    @JoinColumn(name = "game_id")

    var game: Games? = null

    var drawn: Boolean? = null

    var isActive: Boolean? = null

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP")
    var createdAt: LocalDateTime? = null
}