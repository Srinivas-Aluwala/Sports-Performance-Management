package com.sportsmanagement.dto.auth;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersSignupDTO {

    private String username;
    private String password;
    private String role;
    private AthleteSignupDTO athlete;
    private CoacheSignupDTO coache;
    
}
