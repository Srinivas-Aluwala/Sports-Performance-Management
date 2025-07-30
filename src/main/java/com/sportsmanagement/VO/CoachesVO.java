package com.sportsmanagement.VO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoachesVO {

    private Long coacheId;

    private String firstName;

    private String lastName;

    private String gender;

    private String category;

    private String birthDate;

    private String photoUrl;

}
