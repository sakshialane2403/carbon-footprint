package com.infosys.carbonfootprint.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infosys.carbonfootprint.service.ActivityService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class DashboardSummaryController {

    private final ActivityService activityService;

    public DashboardSummaryController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getDashboardSummary(
            @RequestParam Long userId) {

        long totalActivities = activityService.getTotalActivities(userId);
        Double totalEmission = activityService.getTotalEmission(userId);
        double emission = totalEmission != null ? totalEmission : 0.0;

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalActivities", totalActivities);
        summary.put("activityCount", totalActivities);
        summary.put("totalEmission", emission);
        summary.put("totalEmissions", emission);
        summary.put("goalKg", 100);
        summary.put("ecoScore", Math.max(40, Math.min(99, Math.round(100 - emission / 2))));
        return ResponseEntity.ok(summary);
    }
}
