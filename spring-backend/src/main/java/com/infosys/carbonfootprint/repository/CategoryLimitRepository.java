package com.infosys.carbonfootprint.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.carbonfootprint.entity.CategoryLimit;

public interface CategoryLimitRepository extends JpaRepository<CategoryLimit, Long> {
    List<CategoryLimit> findByIsActiveTrue();
}
