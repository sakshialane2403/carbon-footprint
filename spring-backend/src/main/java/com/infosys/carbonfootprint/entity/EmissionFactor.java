package com.infosys.carbonfootprint.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "emission_factors")
public class EmissionFactor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emissionFactorId;
    @ManyToOne(optional = false)
    @JoinColumn(name = "activity_type_id")
    private ActivityType activityType;
    @Column(nullable = false)
    private Double emissionFactor;
    private String unit;
    private String sourceName;
    private String sourceVersion;
    private LocalDate effectiveFrom;
    private LocalDate effectiveTo;
    private String status;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
