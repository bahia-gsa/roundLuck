package com.schaedler.auth.dto;

import lombok.Data;

@Data
public class TokenRequest {
    private String accessToken;
    private String name;
}
