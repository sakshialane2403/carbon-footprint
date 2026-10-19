package com.infosys.carbonfootprint.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.carbonfootprint.config.JwtUtil;
import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class OAuthDemoController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public OAuthDemoController(UserRepository userRepository,
                               PasswordEncoder passwordEncoder,
                               JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Sandbox / demo OAuth. Real Google/GitHub uses oauth2Login when client-id is set.
     * OAuth users are APPROVED immediately — no admin approval.
     */
    @PostMapping("/oauth")
    public ResponseEntity<?> oauth(@RequestBody Map<String, String> body) {
        String provider = (body.getOrDefault("provider", "GOOGLE")).toUpperCase();
        String email = body.get("email");
        if (email == null || email.isBlank()) {
            email = provider.toLowerCase() + ".user@carbon.com";
        }
        String finalEmail = email;
        User user = userRepository.findByEmail(finalEmail).orElseGet(() -> {
            User u = new User();
            String base = finalEmail.split("@")[0];
            u.setUsername(base);
            u.setEmail(finalEmail);
            u.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
            u.setRole("USER");
            u.setStatus("APPROVED");
            u.setFirstLogin(false);
            u.setIsActive(true);
            u.setAuthProvider(provider);
            return userRepository.save(u);
        });
        return ResponseEntity.ok(Map.of(
            "userId", user.getUserId(),
            "username", user.getUsername(),
            "email", user.getEmail(),
            "role", user.getRole(),
            "firstLogin", false,
            "token", jwtUtil.generateToken(user),
            "message", "OAuth login successful.",
            "authProvider", provider
        ));
    }
}
