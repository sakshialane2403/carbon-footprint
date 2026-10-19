package com.infosys.carbonfootprint.serviceimpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.infosys.carbonfootprint.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendRegistrationReceived(String email, String username) {
        send(email, "CarbonTrack — registration received",
            "Hello,\n\nYour CarbonTrack registration was successful.\n\n"
                + "Your username: " + username + "\n\n"
                + "Your account is PENDING admin approval. You will be able to login "
                + "with this username, your email or mobile number after approval.\n\n"
                + "— CarbonTrack");
    }

    @Override
    public void sendAccountCredentials(
        String email,
        String username,
        String temporaryPassword) {

        send(email, "CarbonTrack — account approved",
            "Your registration has been approved.\n\n"
                + "Username: " + username + "\n"
                + "You can login with username, email or mobile number.\n\n"
                + "Please change your password after first login if prompted.\n\n"
                + "— CarbonTrack");
    }

    private void send(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        try {
            mailSender.send(message);
            log.info("Email sent to {} ({})", to, subject);
        } catch (Exception ex) {
            log.error("Failed to send email to {}: {}", to, ex.getMessage());
        }
    }
}
