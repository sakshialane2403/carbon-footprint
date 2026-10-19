package com.infosys.carbonfootprint.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.carbonfootprint.dto.AdminUserRowDTO;
import com.infosys.carbonfootprint.dto.DashboardStatsDTO;
import com.infosys.carbonfootprint.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;

    @GetMapping("/pending-users")
    public ResponseEntity<List<AdminUserRowDTO>> getPendingUsers() {
        return ResponseEntity.ok(userService.getPendingUsers().stream().map(AdminUserRowDTO::from).toList());
    }

    @GetMapping("/approved-users")
    public ResponseEntity<List<AdminUserRowDTO>> getApprovedUsers() {
        return ResponseEntity.ok(userService.getApprovedUsers().stream().map(AdminUserRowDTO::from).toList());
    }

    @GetMapping("/rejected-users")
    public ResponseEntity<List<AdminUserRowDTO>> getRejectedUsers() {
        return ResponseEntity.ok(userService.getRejectedUsers().stream().map(AdminUserRowDTO::from).toList());
    }

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserRowDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers().stream()
            .filter(u -> !"ADMIN".equalsIgnoreCase(u.getRole()))
            .map(AdminUserRowDTO::from)
            .toList());
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        return ResponseEntity.ok(userService.getDashboardStats());
    }

    @PatchMapping("/users/{userId}/approve")
    public ResponseEntity<String> approveUser(@PathVariable Long userId) {
        userService.approveUser(userId);
        return ResponseEntity.ok("User approved successfully");
    }

    @PatchMapping("/users/{userId}/reject")
    public ResponseEntity<String> rejectUser(@PathVariable Long userId) {
        userService.rejectUser(userId);
        return ResponseEntity.ok("User rejected successfully");
    }
}
