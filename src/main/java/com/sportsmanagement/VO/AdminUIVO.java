package com.sportsmanagement.VO;

import java.util.HashSet;
import java.util.Set;

import com.sportsmanagement.modal.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUIVO {
    
    private Long userId;
    private String username;
    private Set<UserRole> roles = new HashSet<>();
}
