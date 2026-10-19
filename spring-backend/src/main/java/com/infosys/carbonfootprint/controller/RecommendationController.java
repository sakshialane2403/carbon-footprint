package com.infosys.carbonfootprint.controller;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.carbonfootprint.entity.Activity;
import com.infosys.carbonfootprint.entity.CategoryLimit;
import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.repository.ActivityRepository;
import com.infosys.carbonfootprint.repository.CategoryLimitRepository;
import com.infosys.carbonfootprint.repository.UserRepository;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final CategoryLimitRepository categoryLimitRepository;

    public RecommendationController(UserRepository userRepository,
                                    ActivityRepository activityRepository,
                                    CategoryLimitRepository categoryLimitRepository) {
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
        this.categoryLimitRepository = categoryLimitRepository;
    }

    @GetMapping
    public ResponseEntity<?> get(@RequestParam Long userId,
                                 @RequestParam(required = false) String month) {
        String m = (month == null || month.isBlank()) ? YearMonth.now().toString() : month;
        User user = userRepository.findById(userId).orElseThrow();
        List<Activity> logs = activityRepository.findByUserOrderByDateDesc(user).stream()
            .filter(a -> a.getDate() != null && a.getDate().toString().startsWith(m))
            .toList();

        List<Map<String, Object>> top = logs.stream()
            .sorted(Comparator.comparing((Activity a) -> a.getEmission() == null ? 0 : a.getEmission()).reversed())
            .limit(5)
            .map(a -> {
                Map<String, Object> row = new HashMap<>();
                row.put("activityName", a.getActivity());
                row.put("category", a.getCategory());
                row.put("quantity", a.getQuantity());
                row.put("emission", a.getEmission());
                row.put("date", a.getDate());
                return row;
            }).toList();

        Map<String, Double> byCat = logs.stream().collect(Collectors.groupingBy(
            a -> a.getCategory() == null ? "Other" : a.getCategory(),
            Collectors.summingDouble(a -> a.getEmission() == null ? 0 : a.getEmission())
        ));

        List<String> alerts = new ArrayList<>();
        for (CategoryLimit limit : categoryLimitRepository.findByIsActiveTrue()) {
            double used = byCat.getOrDefault(limit.getCategoryName(), 0.0);
            if (used > limit.getMonthlyLimitKg()) {
                alerts.add(limit.getAlertMessage());
            }
        }

        Map<String, Object> res = new HashMap<>();
        res.put("month", m);
        res.put("topActivities", top);
        res.put("alerts", alerts);
        res.put("byCategory", byCat);
        return ResponseEntity.ok(res);
    }
}
