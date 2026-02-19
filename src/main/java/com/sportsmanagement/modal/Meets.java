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
public class Meets {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long meetId;
    private String meetName;
    private String createdDateTime;
    private String description;

}
