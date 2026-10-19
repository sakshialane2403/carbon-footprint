package com.infosys.carbonfootprint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {

    private long totalRegisteredUsers;
    private long totalPendingUsers;
    private long totalApprovedUsers;
    private long totalRejectedUsers;
    private long maleUsersCount;
    private long femaleUsersCount;
    
}
