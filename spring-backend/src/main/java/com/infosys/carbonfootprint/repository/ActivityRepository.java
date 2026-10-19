package com.infosys.carbonfootprint.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.infosys.carbonfootprint.entity.Activity;
import com.infosys.carbonfootprint.entity.User;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByUserOrderByDateDesc(User user);

    List<Activity> findByUserAndCategoryOrderByDateDesc(
            User user,
            String category
    );

    long countByUser(User user);

    @Query("SELECT COALESCE(SUM(a.emission), 0) FROM Activity a WHERE a.user = :user")
    Double getTotalEmissionByUser(User user);
}
