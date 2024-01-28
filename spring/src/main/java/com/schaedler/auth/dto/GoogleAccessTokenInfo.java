package com.schaedler.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GoogleAccessTokenInfo {
    @JsonProperty("email")
    private String email;

    @JsonProperty("exp")
    private String expirationTime;

    @JsonProperty("sub")
    private String subject;

    @JsonProperty("aud")
    private String audience;

    @JsonProperty("azp")
    private String authorizedParty;

    @JsonProperty("scope")
    private String scope;

    @JsonProperty("email_verified")
    private String emailVerified;

    @JsonProperty("expires_inn")
    private String expiresIn;

    @JsonProperty("access_type")
    private String accessType;


}
