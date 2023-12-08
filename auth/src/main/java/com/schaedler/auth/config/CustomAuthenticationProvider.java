package com.schaedler.auth.config;

import ch.qos.logback.classic.Logger;
import com.schaedler.auth.controllers.AuthController;
import com.schaedler.auth.service.UserDetailService;
import lombok.AllArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import java.time.Instant;

@AllArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final UserDetailService userDetailService;
    private final PasswordEncoder passwordEncryptor;
    private final JwtDecoder jwtDecoder;
    private static final Logger logger = (Logger) LoggerFactory.getLogger(CustomAuthenticationProvider.class);



    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = (String) authentication.getPrincipal();
        if (username.length() > 100){
            Jwt claims = jwtDecoder.decode(username);
            String usernameJWT = claims.getClaims().get("sub").toString();
            Instant expirationDate = (Instant) claims.getClaims().get("exp");
            if (expirationDate.isBefore(Instant.now())) {
                logger.info("Token expired");
                throw new BadCredentialsException("Token expired");
            }
            UserDetails userDetails = this.userDetailService.loadUserByUsername(usernameJWT);
            return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
        }else{
            String password = (String) authentication.getCredentials();
            UserDetails userDetails = this.userDetailService.loadUserByUsername(username);
            if (userDetails == null) {
                System.out.println("User not found");
                throw new UsernameNotFoundException("User not found");
            }
            if (!passwordEncryptor.matches(password, userDetails.getPassword())) {
                logger.info("Wrong password");
                throw new BadCredentialsException("Wrong password");
            }
            return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        // return authentication.equals(UsernamePasswordAuthenticationToken.class);
        return true;
    }

}
