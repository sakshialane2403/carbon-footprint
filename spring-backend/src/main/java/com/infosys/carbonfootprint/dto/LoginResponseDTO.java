package com.infosys.carbonfootprint.dto;

public class LoginResponseDTO {

    private Long userId;
    private String username;
    private String role;
    private Boolean firstLogin;
    private String token;
    private String message;
    private String email;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(
        Long userId,
        String username,
        String role,
        Boolean firstLogin,
        String token,
        String message) {

        this.userId = userId;
        this.username = username;
        this.role = role;
        this.firstLogin = firstLogin;
        this.token = token;
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getFirstLogin() {
        return firstLogin;
    }

    public void setFirstLogin(Boolean firstLogin) {
        this.firstLogin = firstLogin;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
