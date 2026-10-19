package com.infosys.carbonfootprint.controller;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infosys.carbonfootprint.entity.ActivityLog;
import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.entity.UserGoal;
import com.infosys.carbonfootprint.repository.ActivityLogRepository;
import com.infosys.carbonfootprint.repository.UserGoalRepository;
import com.infosys.carbonfootprint.repository.UserRepository;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final UserGoalRepository goalRepository;
    private final UserRepository userRepository;
    private final ActivityLogRepository activityLogRepository;

    public GoalController(UserGoalRepository goalRepository,
                          UserRepository userRepository,
                          ActivityLogRepository activityLogRepository) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
        this.activityLogRepository = activityLogRepository;
    }

    @GetMapping
    public ResponseEntity<?> list(@RequestParam Long userId,
                                  @RequestParam(required = false) String month) {
        User user = userRepository.findById(userId).orElseThrow();
        if (month != null && !month.isBlank()) {
            return ResponseEntity.ok(goalRepository.findByUserAndMonthKey(user, month)
                .map(g -> toMap(g, usedFor(user, month)))
                .orElse(Map.of("message", "No goal for this month")));
        }
        List<Map<String, Object>> list = goalRepository.findByUserOrderByMonthKeyDesc(user)
            .stream().map(g -> toMap(g, usedFor(user, g.getMonthKey()))).toList();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body) {
        Long userId = Long.valueOf(body.get("userId").toString());
        String month = body.getOrDefault("month", YearMonth.now().toString()).toString();
        Double target = Double.valueOf(body.get("targetKg").toString());
        User user = userRepository.findById(userId).orElseThrow();
        UserGoal goal = goalRepository.findByUserAndMonthKey(user, month).orElseGet(UserGoal::new);
        goal.setUser(user);
        goal.setMonthKey(month);
        goal.setTargetKg(target);
        if (body.get("title") != null) goal.setTitle(body.get("title").toString());
        goalRepository.save(goal);
        return ResponseEntity.ok(toMap(goal, usedFor(user, month)));
    }

    @GetMapping("/progress")
    public ResponseEntity<?> progress(@RequestParam Long userId,
                                      @RequestParam(required = false) String month) {
        String m = (month == null || month.isBlank()) ? YearMonth.now().toString() : month;
        User user = userRepository.findById(userId).orElseThrow();
        UserGoal goal = goalRepository.findByUserAndMonthKey(user, m).orElse(null);
        double used = usedFor(user, m);
        double target = goal != null ? goal.getTargetKg() : 100;
        Map<String, Object> res = new HashMap<>();
        res.put("month", m);
        res.put("target", target);
        res.put("used", used);
        res.put("remaining", Math.max(0, target - used));
        res.put("percent", target == 0 ? 0 : Math.min(100, Math.round(used / target * 100)));
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        goalRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }

    private double usedFor(User user, String monthKey) {
        YearMonth ym = YearMonth.parse(monthKey);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();
        return activityLogRepository.findByUserAndActivityDateBetween(user, start, end)
            .stream()
            .mapToDouble(a -> a.getTotalEmission() == null ? 0 : a.getTotalEmission())
            .sum();
    }

    private Map<String, Object> toMap(UserGoal g, double used) {
        Map<String, Object> m = new HashMap<>();
        m.put("id", g.getGoalId());
        m.put("month", g.getMonthKey());
        m.put("title", g.getTitle());
        m.put("targetKg", g.getTargetKg());
        m.put("used", Math.round(used * 100.0) / 100.0);
        m.put("percent", g.getTargetKg() == 0 ? 0 : Math.min(100, Math.round(used / g.getTargetKg() * 100)));
        m.put("status", used >= g.getTargetKg() ? "Completed" : "In Progress");
        return m;
    }
}
