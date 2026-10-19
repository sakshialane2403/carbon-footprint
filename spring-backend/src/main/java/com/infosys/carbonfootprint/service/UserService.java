package com.infosys.carbonfootprint.service;

import java.util.List;

import com.infosys.carbonfootprint.dto.DashboardStatsDTO;
import com.infosys.carbonfootprint.dto.UserRegistrationDTO;
import com.infosys.carbonfootprint.entity.User;

public interface UserService {
    String registerUser(UserRegistrationDTO userRegistrationDTO);
    User getUserProfile(String username);
    User getUserByUsername(String username); 
    List<User> getPendingUsers();
    List<User> getApprovedUsers();
    List<User> getRejectedUsers();
    List<User> getAllUsers();
    void approveUser(Long userId);
    void rejectUser(Long userId);
    DashboardStatsDTO getDashboardStats();
}
