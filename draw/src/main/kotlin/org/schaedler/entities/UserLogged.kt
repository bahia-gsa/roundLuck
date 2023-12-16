package org.schaedler.entities

import com.fasterxml.jackson.annotation.JsonProperty

data class UserLogged(
    @JsonProperty("token") val token: String = "",
    @JsonProperty("email") val email: String = ""
)

