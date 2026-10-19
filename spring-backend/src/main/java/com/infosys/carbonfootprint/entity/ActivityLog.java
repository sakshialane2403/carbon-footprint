package com.infosys.carbonfootprint.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "activity_logs")
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityLogId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne
    @JoinColumn(name = "activity_type_id")
    private ActivityType activityType;
    private Double quantity;
    private String unit;
    private Double emissionFactor;
    private Double totalEmission;
    private LocalDate activityDate;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
