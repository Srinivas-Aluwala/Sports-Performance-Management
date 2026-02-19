package com.sportsmanagement.controller;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sportsmanagement.modal.Events;
import com.sportsmanagement.service.publicEndpoints.PublicService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PublicController {

    @Autowired
    PublicService publicService;

    @GetMapping("/fetchEvents")
    public List<Events> fetchEvents() {
        try {

            return publicService.fetchEvents();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Fetching Usernames Failed: " + e.getMessage());
        }
    }


    @GetMapping("/fetchEventImages/{eventId}")
    public ResponseEntity<?> fetchImages(@PathVariable("eventId") Long eventId){

        ByteArrayResource byteArrayResource = publicService.fetchImages(eventId);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("image/jpeg"));
        headers.setContentDisposition(ContentDisposition.attachment().build());

        return new ResponseEntity<>(byteArrayResource, headers, HttpStatus.OK);
    }
}

