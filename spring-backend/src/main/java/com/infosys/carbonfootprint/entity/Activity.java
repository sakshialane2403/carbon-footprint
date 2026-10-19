package com.infosys.carbonfootprint.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String activity;
    private Double quantity;
    private Double factor;
    private Double emission;
    private LocalDate date;
    private String notes;
    private String unit;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonProperty("activityName")
    public String getActivityName() {
        return activity;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getActivity() { return activity; }
    public void setActivity(String activity) { this.activity = activity; }
    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }
    public Double getFactor() { return factor; }
    public void setFactor(Double factor) { this.factor = factor; }
    public Double getEmission() { return emission; }
    public void setEmission(Double emission) { this.emission = emission; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
