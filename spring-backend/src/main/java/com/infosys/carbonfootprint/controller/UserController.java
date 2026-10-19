package com.infosys.carbonfootprint.controller;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.carbonfootprint.dto.UserRegistrationDTO;
import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(
        value = "/register",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Map<String, Object>> registerUser(
        @Valid @ModelAttribute UserRegistrationDTO dto)
        throws IOException {

        String message = userService.registerUser(dto);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", message);
        body.put("username", dto.getDesiredUsername());
        body.put("email", dto.getEmail());
        body.put("status", "PENDING");
        body.put("emailSent", true);
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserProfile(username);
        return ResponseEntity.ok(user);
    }
}
