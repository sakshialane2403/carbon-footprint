package com.infosys.carbonfootprint.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "user_goals", uniqueConstraints = @UniqueConstraint(columnNames = { "user_id", "month_key" }))
public class UserGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "month_key", nullable = false, length = 7)
    private String monthKey;

    @Column(name = "target_kg", nullable = false)
    private Double targetKg;

    @Column(name = "title", length = 120)
    private String title = "Monthly carbon target";

    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getGoalId() { return goalId; }
    public void setGoalId(Long goalId) { this.goalId = goalId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getMonthKey() { return monthKey; }
    public void setMonthKey(String monthKey) { this.monthKey = monthKey; }
    public Double getTargetKg() { return targetKg; }
    public void setTargetKg(Double targetKg) { this.targetKg = targetKg; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
