package org.schaedler.entities

import com.fasterxml.jackson.annotation.JsonProperty
import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import java.time.LocalDateTime


@Entity
open class Games : PanacheEntity() {

    @JsonProperty("gamename")
    @field:NotBlank(message = "Game name must not be blank")
    @field:Size(min = 3, max = 20, message = "Game name length must be between 3 and 20 characters")
    open var gameName: String? = null

    open var userId: Long? = null

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP")
    open var createdAt: LocalDateTime? = null
}