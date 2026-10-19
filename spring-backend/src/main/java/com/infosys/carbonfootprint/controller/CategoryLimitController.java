package com.infosys.carbonfootprint.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infosys.carbonfootprint.entity.CategoryLimit;
import com.infosys.carbonfootprint.repository.CategoryLimitRepository;

@RestController
@RequestMapping("/api/admin/category-limits")
public class CategoryLimitController {

    private final CategoryLimitRepository repository;

    public CategoryLimitController(CategoryLimitRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<CategoryLimit> all() {
        return repository.findAll();
    }

    @PostMapping
    public CategoryLimit save(@RequestBody CategoryLimit limit) {
        return repository.save(limit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryLimit> update(@PathVariable Long id, @RequestBody CategoryLimit incoming) {
        CategoryLimit l = repository.findById(id).orElseThrow();
        l.setCategoryName(incoming.getCategoryName());
        l.setMonthlyLimitKg(incoming.getMonthlyLimitKg());
        l.setAlertMessage(incoming.getAlertMessage());
        l.setIsActive(incoming.getIsActive());
        return ResponseEntity.ok(repository.save(l));
    }
}
