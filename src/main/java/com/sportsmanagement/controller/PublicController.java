package com.sportsmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sportsmanagement.modal.Events;
import com.sportsmanagement.service.publicEndpoints.PublicService;

@RestController
@CrossOrigin(origins = "*")
public class PublicController {

    private PublicService publicService;
    
    
    @GetMapping("/fetchEvents")
    public List<Events> fetchEvents() {
        try {

            return publicService.fetchEvents();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Fetching Usernames Failed: " + e.getMessage());
        }
    }
}
