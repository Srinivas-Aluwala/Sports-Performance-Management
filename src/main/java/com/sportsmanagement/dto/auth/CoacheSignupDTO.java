package com.sportsmanagement.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CoacheSignupDTO {

    private String firstname;

    private String lastname;
    
    private String email;

    private String gender;

    private String category;

    private String birthDate;

}
