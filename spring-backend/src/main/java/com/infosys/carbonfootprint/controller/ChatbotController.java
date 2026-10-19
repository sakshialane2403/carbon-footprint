package com.infosys.carbonfootprint.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.carbonfootprint.repository.ChatbotFaqRepository;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    private final ChatbotFaqRepository faqRepository;

    public ChatbotController(ChatbotFaqRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

    @GetMapping("/faqs")
    public ResponseEntity<?> faqs(@RequestParam(defaultValue = "GUEST") String audience) {
        String a = audience.toUpperCase();
        return ResponseEntity.ok(
            faqRepository.findByIsActiveTrueAndAudienceInOrderBySortOrderAsc(List.of(a, "BOTH"))
        );
    }
}
