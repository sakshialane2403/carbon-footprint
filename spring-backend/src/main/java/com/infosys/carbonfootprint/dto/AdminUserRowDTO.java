package com.infosys.carbonfootprint.dto;

import com.infosys.carbonfootprint.entity.PersonalDetails;
import com.infosys.carbonfootprint.entity.User;

public class AdminUserRowDTO {
    private Long userId;
    private Long id;
    private String username;
    private String name;
    private String email;
    private String mobile;
    private String mobileNumber;
    private String status;
    private String role;

    public static AdminUserRowDTO from(User u) {
        AdminUserRowDTO d = new AdminUserRowDTO();
        d.userId = u.getUserId();
        d.id = u.getUserId();
        d.username = u.getUsername();
        d.email = u.getEmail();
        d.status = u.getStatus();
        d.role = u.getRole();
        PersonalDetails p = u.getPersonalDetails();
        if (p != null) {
            String fn = p.getFirstName() == null ? "" : p.getFirstName();
            String ln = p.getLastName() == null ? "" : p.getLastName();
            d.name = (fn + " " + ln).trim();
            d.mobile = p.getMobileNumber();
            d.mobileNumber = p.getMobileNumber();
        } else {
            d.name = u.getUsername();
        }
        return d;
    }

    public Long getUserId() { return userId; }
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getMobile() { return mobile; }
    public String getMobileNumber() { return mobileNumber; }
    public String getStatus() { return status; }
    public String getRole() { return role; }
}
