package com.infosys.carbonfootprint.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.carbonfootprint.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByStatusOrderByPublishedAtDesc(String status);
    List<Article> findAllByOrderByCreatedAtDesc();
}
