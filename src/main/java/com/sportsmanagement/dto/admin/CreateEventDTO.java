package com.sportsmanagement.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateEventDTO {

    private String eventName;
    private String eventDate;
    private String meetName;
    private String category;
    private String description;
    
}
