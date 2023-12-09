package org.schaedler.dto

import java.time.LocalDateTime

data class PlayersDTO(
    var id: Long? = null,
    var playerName: String? = null,
    var gameId: Long? = null,
    var playerEmail: String? = null,
    var drawn: Boolean? = null,
    var active: Boolean? = null,
    var createdAt: LocalDateTime? = null
)