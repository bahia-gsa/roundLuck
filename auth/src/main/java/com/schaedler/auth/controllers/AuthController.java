package com.schaedler.auth.controllers;

import ch.qos.logback.classic.Logger;
import com.schaedler.auth.service.TokenService;
import lombok.AllArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.http.HttpResponse;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final JwtDecoder decoder;
    private static final Logger logger = (Logger) LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/readToken")
    public ResponseEntity<Object> readToken(@RequestBody String jwtReceived) {
        if (jwtReceived.length() > 1) {
            try {
                Jwt decodedJwt = this.decoder.decode(jwtReceived);
                if (isTokenExpired(decodedJwt)) {
                   return ResponseEntity.status(401).body("Token expired");
                }
                Map<String, Object> claimsMap = new HashMap<>();
                decodedJwt.getClaims().forEach((key, value) -> claimsMap.put(key, value));
                return ResponseEntity.ok(claimsMap);
            } catch (Exception e) {
                logger.error ("Failed to decode token: " + e.getMessage());
                return ResponseEntity.status(500).body("Invalid token");
            }
        } else {
           logger.error ("Invalid or missing Bearer token");
            return ResponseEntity.status(500).body("Invalid or missing Bearer token");
        }
    }

    /*@PostMapping("/isTokenValid")
    public ResponseEntity<Boolean> isTokenValid(@RequestBody String jwtReceived){
        try {
            Jwt decodedJwt = this.decoder.decode(jwtReceived);
            if (isTokenExpired(decodedJwt)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Boolean.FALSE);
            }
            return ResponseEntity.ok(Boolean.TRUE);
        } catch (Exception e) {
            logger.error ("Failed to decode token: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Boolean.FALSE);
        }
    }*/

    @PostMapping("/isTokenValid")
    public ResponseEntity<Boolean> isTokenValid(@RequestBody String jwtReceived){
        try {
            this.decoder.decode(jwtReceived);
            return ResponseEntity.ok(Boolean.TRUE);
        } catch (Exception e) {
            logger.error ("Failed to decode token: " + e.getMessage());
            return ResponseEntity.ok(Boolean.FALSE);
        }
    }


    private boolean isTokenExpired(Jwt decodedJwt) {
        Instant expirationDate = (Instant) decodedJwt.getClaims().get("exp");
        return expirationDate.isBefore(Instant.now());
    }

}



