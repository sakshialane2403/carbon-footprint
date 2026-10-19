package com.infosys.carbonfootprint.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infosys.carbonfootprint.entity.Activity;
import com.infosys.carbonfootprint.service.ActivityService;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping
    public ResponseEntity<Activity> addActivity(
            @RequestParam Long userId,
            @RequestBody Map<String, Object> body) {

        Activity activity = new Activity();
        String name = str(body.get("activityName"), str(body.get("activity"), ""));
        activity.setActivity(name);
        activity.setCategory(str(body.get("category"), "Other"));
        activity.setQuantity(num(body.get("quantity")));
        activity.setUnit(str(body.get("unit"), ""));
        activity.setNotes(str(body.get("note"), str(body.get("notes"), "")));
        String date = str(body.get("date"), str(body.get("activityDate"), LocalDate.now().toString()));
        activity.setDate(LocalDate.parse(date.substring(0, 10)));

        Activity saved = activityService.addActivity(activity, userId);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Activity>> getActivities(@RequestParam Long userId) {
        return ResponseEntity.ok(activityService.getUserActivities(userId));
    }

    @DeleteMapping("/{activityId}")
    public ResponseEntity<String> deleteActivity(
            @PathVariable Long activityId,
            @RequestParam Long userId) {
        activityService.deleteActivity(activityId, userId);
        return ResponseEntity.ok("Activity deleted successfully");
    }

    private String str(Object v, String fallback) {
        return v == null || String.valueOf(v).isBlank() ? fallback : String.valueOf(v);
    }

    private Double num(Object v) {
        if (v == null) return 0.0;
        return Double.valueOf(v.toString());
    }
}
