package com.infosys.carbonfootprint.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.entity.UserGoal;

public interface UserGoalRepository extends JpaRepository<UserGoal, Long> {
    List<UserGoal> findByUserOrderByMonthKeyDesc(User user);
    Optional<UserGoal> findByUserAndMonthKey(User user, String monthKey);
}
