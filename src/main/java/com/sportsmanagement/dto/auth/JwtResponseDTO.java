package com.sportsmanagement.dto.auth;

import com.sportsmanagement.VO.auth.UsersVO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponseDTO extends UsersVO{

    private String accessToken;


    public JwtResponseDTO(UsersVO byUsername) {
        super.setUserId(byUsername.getUserId());
        super.setUsername(byUsername.getUsername());
        super.setRoles(byUsername.getRoles());
        super.setAthlete(byUsername.getAthlete());
        super.setCoache(byUsername.getCoache());

    }
}