package com.sportsmanagement.VO.auth;

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
public class CoachesUIVO {

    private Long userId;

    private Long coacheId;

    private String username;

    private String firstName;

    private String lastName;

    private String gender;

    private String category;

    private String birthDate;

    private String photoUrl;

    private Set<UserRole> roles = new HashSet<>();

}
