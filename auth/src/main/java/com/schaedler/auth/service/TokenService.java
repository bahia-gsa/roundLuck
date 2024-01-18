package com.schaedler.auth.service;

import com.schaedler.auth.entities.AppUser;
import com.schaedler.auth.entities.UserDetail;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TokenService {

    private final JwtEncoder encoder;

    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();
        UserDetail user = (UserDetail) authentication.getPrincipal();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("AUTH SCHAEDLER")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("userId", user.getUserId())
                .claim("name", user.getName())
                .build();

        var encoderParameters = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS512).build(), claims);
        return this.encoder.encode(encoderParameters).getTokenValue();
    }

    public String generateTokenGoogleLogin(AppUser user) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("AUTH SCHAEDLER")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .claim("name", user.getName())
                .build();

        var encoderParameters = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS512).build(), claims);
        return this.encoder.encode(encoderParameters).getTokenValue();
    }
}
