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
public class AthletesUIVO {

    private Long userId;
    
    private Long athleteId;

    private String username;

    private String firstName;

    private String lastName;

    private String height;

    private String weight;

    private String gender;

    private String category;

    private String birthDate;

    private String photoUrl;

    private Set<UserRole> roles = new HashSet<>();
}
