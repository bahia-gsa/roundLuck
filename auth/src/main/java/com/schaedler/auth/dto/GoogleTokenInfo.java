package com.schaedler.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GoogleTokenInfo {
    @JsonProperty("iss")
    private String issuer;

    @JsonProperty("sub")
    private String subject;

    @JsonProperty("aud")
    private String audience;

    @JsonProperty("exp")
    private long expirationTime;

    @JsonProperty("iat")
    private long issuedAtTime;

    @JsonProperty("email")
    private String email;

    @JsonProperty("email_verified")
    private boolean emailVerified;

    @JsonProperty("name")
    private String name;

    @JsonProperty("picture")
    private String pictureUrl;

    @JsonProperty("given_name")
    private String givenName;

    @JsonProperty("family_name")
    private String familyName;

    @JsonProperty("locale")
    private String locale;

    @JsonProperty("alg")
    private String algorithm;

    @JsonProperty("kid")
    private String keyId;

    @JsonProperty("typ")
    private String type;

    @JsonProperty("azp")
    private String authorizedParty;




}
