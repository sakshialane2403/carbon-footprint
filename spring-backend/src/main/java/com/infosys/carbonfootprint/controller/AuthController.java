package com.infosys.carbonfootprint.controller;

import com.infosys.carbonfootprint.dto.LoginRequestDTO;
import com.infosys.carbonfootprint.dto.LoginResponseDTO;
import com.infosys.carbonfootprint.dto.PasswordResetDTO;
import com.infosys.carbonfootprint.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
        @Valid @RequestBody LoginRequestDTO loginRequestDTO) {

        LoginResponseDTO response =
            authService.login(loginRequestDTO);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
        @Valid @RequestBody PasswordResetDTO passwordResetDTO,
        Authentication authentication) {

       
        if (!authentication.getName().equals(passwordResetDTO.getUsername())) {
            throw new IllegalArgumentException(
                "You can only reset your own password"
            );
        }

        String response =
            authService.resetPassword(passwordResetDTO);

        return ResponseEntity.ok(response);
    }
}
