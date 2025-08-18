package com.sportsmanagement.modal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Events {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long eventId;

    private String eventName;
    
    private String eventDate;
    
    private String meetName;
    
    private String category;
    
    private String description;
    
    private String photoUrl;

}
