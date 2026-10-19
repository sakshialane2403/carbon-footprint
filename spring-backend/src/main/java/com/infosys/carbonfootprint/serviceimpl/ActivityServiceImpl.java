package com.infosys.carbonfootprint.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.infosys.carbonfootprint.entity.Activity;
import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.repository.ActivityRepository;
import com.infosys.carbonfootprint.repository.UserRepository;
import com.infosys.carbonfootprint.service.ActivityService;

@Service
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    public ActivityServiceImpl(
            ActivityRepository activityRepository,
            UserRepository userRepository) {

        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Activity addActivity(Activity activity, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        double factor = calculateEmissionFactor(
                activity.getCategory(),
                activity.getActivity()
        );

        double emission = activity.getQuantity() * factor;

        activity.setFactor(factor);
        activity.setEmission(emission);
        activity.setUser(user);

        return activityRepository.save(activity);
    }

    @Override
    public List<Activity> getUserActivities(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return activityRepository.findByUserOrderByDateDesc(user);
    }

    @Override
    public void deleteActivity(Long activityId, Long userId) {

        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        if (activity.getUser().getUserId().equals(userId)) {
            activityRepository.delete(activity);
        } else {
            throw new RuntimeException(
                    "You are not allowed to delete this activity"
            );
        }
    }
    @Override
    public long getTotalActivities(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return activityRepository.countByUser(user);
    }

    @Override
    public Double getTotalEmission(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return activityRepository.getTotalEmissionByUser(user);
    }

    private double calculateEmissionFactor(
            String category,
            String activity) {

        if (category == null || activity == null) {
            throw new RuntimeException("Category and activity are required");
        }

        if (category.equalsIgnoreCase("Transport")) {

            if (activity.equalsIgnoreCase("Car")) {
                return 0.21;
            }

            if (activity.equalsIgnoreCase("Bus")) {
                return 0.08;
            }

            if (activity.equalsIgnoreCase("Bike")) {
                return 0.05;
            }

            if (activity.equalsIgnoreCase("Train")) {
                return 0.04;
            }
            if (activity.equalsIgnoreCase("Flight")) {
                return 0.25;
            }
        }

        if (category.equalsIgnoreCase("Electricity")) {

            return 0.82;
        }

        if (category.equalsIgnoreCase("Food")) {

            if (activity.equalsIgnoreCase("Veg Meal")) {
                return 0.70;
            }

            if (activity.equalsIgnoreCase("Non-Veg Meal")
                    || activity.equalsIgnoreCase("Chicken Meal")) {
                return 2.50;
            }
        }

        if (category.equalsIgnoreCase("Shopping")) {

            return 0.50;
        }

        throw new RuntimeException(
                "Emission factor not available for this activity"
        );
    }
}
