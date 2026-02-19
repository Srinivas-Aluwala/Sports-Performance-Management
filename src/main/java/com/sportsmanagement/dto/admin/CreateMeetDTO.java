package com.sportsmanagement.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
    
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMeetDTO {

    private String meetName;
    private String description;
    
}

