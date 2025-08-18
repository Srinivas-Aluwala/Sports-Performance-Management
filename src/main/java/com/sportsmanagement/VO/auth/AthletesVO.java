package com.sportsmanagement.VO.auth;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AthletesVO {
    
    private Long athleteId;

    private String firstName;

    private String lastName;

    private String height;

    private String weight;

    private String gender;

    private String category;

    private String birthDate;

    private String photoUrl;

}
