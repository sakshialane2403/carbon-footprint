package com.infosys.carbonfootprint.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.carbonfootprint.entity.ActivityLog;
import com.infosys.carbonfootprint.entity.User;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findByUserAndActivityDateBetween(User user, LocalDate start, LocalDate end);
    List<ActivityLog> findByUserOrderByActivityDateDesc(User user);
}
