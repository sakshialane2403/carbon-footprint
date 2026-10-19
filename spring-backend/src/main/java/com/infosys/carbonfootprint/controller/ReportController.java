package com.infosys.carbonfootprint.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.carbonfootprint.entity.Activity;
import com.infosys.carbonfootprint.service.ActivityService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ActivityService activityService;

    public ReportController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/monthly")
    public ResponseEntity<Map<String, Object>> monthly(@RequestParam Long userId) {
        List<Activity> list = activityService.getUserActivities(userId);
        double total = list.stream().mapToDouble(a -> a.getEmission() == null ? 0 : a.getEmission()).sum();
        Map<String, Double> byCat = new HashMap<>();
        list.forEach(a -> {
            String c = a.getCategory() == null ? "Other" : a.getCategory();
            byCat.put(c, byCat.getOrDefault(c, 0.0) + (a.getEmission() == null ? 0 : a.getEmission()));
        });
        Map<String, Object> res = new HashMap<>();
        res.put("totalEmission", total);
        res.put("activityCount", list.size());
        res.put("byCategory", byCat);
        res.put("activities", list);
        return ResponseEntity.ok(res);
    }
}
