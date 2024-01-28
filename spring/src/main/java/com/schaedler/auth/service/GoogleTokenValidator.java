package com.schaedler.auth.service;

import ch.qos.logback.classic.Logger;
import com.schaedler.auth.dto.GoogleAccessTokenInfo;
import com.schaedler.auth.dto.GoogleTokenInfo;
import lombok.AllArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@AllArgsConstructor
public class GoogleTokenValidator {

    private static final String TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}";
    private static final String ACCESS_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={token}";
    private static final Logger logger = (Logger) LoggerFactory.getLogger(GoogleTokenValidator.class);
    private final RestTemplate restTemplate;


    public GoogleTokenInfo validateToken(String token) {
        ResponseEntity<GoogleTokenInfo> response = restTemplate.getForEntity(TOKEN_INFO_URL, GoogleTokenInfo.class, token);
        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            logger.error("Error validating token: " + response.getStatusCodeValue());
            return null;
        }
    }

    public GoogleAccessTokenInfo validateAccessToken(String accessToken) {
        logger.info("Validating access token: " + accessToken);
        ResponseEntity<GoogleAccessTokenInfo> response = restTemplate.getForEntity(ACCESS_TOKEN_INFO_URL, GoogleAccessTokenInfo.class, accessToken);
        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            logger.error("Error validating token: " + response.getStatusCodeValue());
            return null;
        }
    }
}
