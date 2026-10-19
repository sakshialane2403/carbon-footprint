package com.infosys.carbonfootprint.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;
    @Column(unique = true, nullable = false)
    private String categoryCode;
    @Column(unique = true, nullable = false)
    private String categoryName;
    @Column(nullable = false)
    private String description;
    private String icon;
    private String colorCode;
    private Integer displayOrder;
    @Column(nullable = false)
    private String status;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdAt;
    private String updatedBy;
    private LocalDateTime updatedAt;

    @PrePersist
    void onCreate() { createdAt = LocalDateTime.now(); }

    @PreUpdate
    void onUpdate() { updatedAt = LocalDateTime.now(); }
}
