package com.infosys.carbonfootprint.service;

import java.util.List;

import com.infosys.carbonfootprint.entity.Activity;

public interface ActivityService {

    Activity addActivity(Activity activity, Long userId);

    List<Activity> getUserActivities(Long userId);

    void deleteActivity(Long activityId, Long userId);
    
    long getTotalActivities(Long userId);

    Double getTotalEmission(Long userId);
}
