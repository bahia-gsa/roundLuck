package com.schaedler.auth.controllers;

import ch.qos.logback.classic.Logger;
import com.schaedler.auth.dto.AppUserDTO;
import com.schaedler.auth.entities.AppUser;
import com.schaedler.auth.repositories.UserRepository;
import com.schaedler.auth.service.TokenService;
import lombok.AllArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth/profile")
@AllArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncryptor;
    private final TokenService tokenService;

    private static final Logger logger = (Logger) LoggerFactory.getLogger(UserController.class);

    @PostMapping("/register")
    public ResponseEntity<?> registerNewUser(@RequestBody AppUser user) {
        try{
            Optional<AppUser> userFound = userRepository.findByEmail(user.getEmail());
            if (userFound.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User with the email " + user.getEmail() + " already exists.");
            }
            user.setPassword(passwordEncryptor.encode(user.getPassword()));
            return ResponseEntity.ok(convertToDTO(userRepository.save(user)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    private AppUserDTO convertToDTO(AppUser user) {
        return new AppUserDTO(user.getId(), user.getName(), user.getEmail());
    }

    @GetMapping("/secured")
    public String teste() {
        return "secured";
    }

    @PostMapping("/login")
    public ResponseEntity<Object> getToken(Authentication authentication) {
        Optional<AppUser> checkUserExists = userRepository.findByEmail(authentication.getName());
        if (checkUserExists.isPresent()) {
            AppUser user = checkUserExists.get();
                Map<String, Object> responseBody = new HashMap<>();
                responseBody.put("token", tokenService.generateToken(authentication));
                responseBody.put("userId", user.getId());
                responseBody.put("name", user.getName());
                responseBody.put("email", user.getEmail());
                return ResponseEntity.ok(responseBody);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with this email was not found");
        }
    }

}
