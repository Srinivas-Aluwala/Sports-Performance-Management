package com.sportsmanagement.VO;

import java.util.List;

import com.sportsmanagement.modal.UserInfo;
import com.sportsmanagement.modal.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpUIVO {
    
    private UserInfo userInfo;
    private List<UserRole> userRole;
}
