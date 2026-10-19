package com.infosys.carbonfootprint.service;

public interface EmailService {

    void sendRegistrationReceived(String email, String username);

    void sendAccountCredentials(
        String email,
        String username,
        String temporaryPassword);
}
