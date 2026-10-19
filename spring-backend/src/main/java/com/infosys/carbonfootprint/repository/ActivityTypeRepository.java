package com.infosys.carbonfootprint.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.carbonfootprint.entity.ActivityType;
import com.infosys.carbonfootprint.entity.Category;

public interface ActivityTypeRepository extends JpaRepository<ActivityType, Long> {
    List<ActivityType> findByCategory(Category category);
}
