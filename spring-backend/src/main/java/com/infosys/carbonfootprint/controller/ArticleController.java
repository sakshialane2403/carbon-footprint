package com.infosys.carbonfootprint.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infosys.carbonfootprint.entity.Article;
import com.infosys.carbonfootprint.repository.ArticleRepository;

@RestController
public class ArticleController {

    private final ArticleRepository articleRepository;

    public ArticleController(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @GetMapping("/api/articles")
    public ResponseEntity<?> published() {
        return ResponseEntity.ok(articleRepository.findByStatusOrderByPublishedAtDesc("PUBLISHED"));
    }

    @GetMapping("/api/articles/{id}")
    public ResponseEntity<?> one(@PathVariable Long id) {
        return articleRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/api/admin/articles")
    public ResponseEntity<?> allAdmin() {
        return ResponseEntity.ok(articleRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping("/api/admin/articles")
    public ResponseEntity<?> create(@RequestBody Article article) {
        article.setCreatedAt(LocalDateTime.now());
        article.setUpdatedAt(LocalDateTime.now());
        if (article.getStatus() == null) article.setStatus("DRAFT");
        if ("PUBLISHED".equalsIgnoreCase(article.getStatus())) {
            article.setPublishedAt(LocalDateTime.now());
        }
        return ResponseEntity.ok(articleRepository.save(article));
    }

    @PutMapping("/api/admin/articles/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Article incoming) {
        Article a = articleRepository.findById(id).orElseThrow();
        a.setTitle(incoming.getTitle());
        a.setSummary(incoming.getSummary());
        a.setContent(incoming.getContent());
        a.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(articleRepository.save(a));
    }

    @PatchMapping("/api/admin/articles/{id}/publish")
    public ResponseEntity<?> publish(@PathVariable Long id) {
        Article a = articleRepository.findById(id).orElseThrow();
        a.setStatus("PUBLISHED");
        a.setPublishedAt(LocalDateTime.now());
        return ResponseEntity.ok(articleRepository.save(a));
    }

    @DeleteMapping("/api/admin/articles/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        articleRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}
