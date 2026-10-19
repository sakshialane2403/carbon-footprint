package com.infosys.carbonfootprint.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "activity_types")
public class ActivityType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityTypeId;
    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id")
    private Category category;
    private String activityCode;
    @Column(nullable = false)
    private String activityName;
    private String description;
    @Column(nullable = false)
    private String unit;
    private Double minQuantity;
    private Double maxQuantity;
    private Double defaultQuantity;
    private Integer displayOrder;
    private String icon;
    private String status;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
