package com.infosys.carbonfootprint.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.carbonfootprint.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByCategoryNameIgnoreCase(String categoryName);
    Optional<Category> findByCategoryNameIgnoreCase(String categoryName);
}
