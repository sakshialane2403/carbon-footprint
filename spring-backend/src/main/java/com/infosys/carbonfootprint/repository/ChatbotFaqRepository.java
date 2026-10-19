package com.infosys.carbonfootprint.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.carbonfootprint.entity.ChatbotFaq;

public interface ChatbotFaqRepository extends JpaRepository<ChatbotFaq, Long> {
    List<ChatbotFaq> findByIsActiveTrueAndAudienceInOrderBySortOrderAsc(List<String> audiences);
}
