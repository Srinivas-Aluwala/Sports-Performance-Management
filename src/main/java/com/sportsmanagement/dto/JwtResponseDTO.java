package com.sportsmanagement.dto;

import com.sportsmanagement.modal.UserInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponseDTO extends UserInfo{

    private String accessToken;


    public JwtResponseDTO(UserInfo byUsername) {
        super.setUsername(byUsername.getUsername());
        super.setUserId(byUsername.getUserId());
        super.setFirstName(byUsername.getFirstName());
        super.setLastName(byUsername.getLastName());
        super.setGender(byUsername.getGender());
        super.setHeight(byUsername.getHeight());
        super.setWeight(byUsername.getWeight());
        super.setBirthDate(byUsername.getBirthDate());
        super.setPhotoUrl(byUsername.getPhotoUrl());
        super.setCategory(byUsername.getCategory());
        super.setRoles(byUsername.getRoles());

    }
}