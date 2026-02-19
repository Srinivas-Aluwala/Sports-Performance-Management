package com.sportsmanagement.service.publicEndpoints;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import com.sportsmanagement.modal.Events;
import com.sportsmanagement.repo.EventsRepository;

@Service
public class PublicServiceImp implements PublicService {

    @Autowired
    EventsRepository eventRepo;


    @Override
    public List<Events> fetchEvents() {
               
       List<Events> events =  (List<Events>) eventRepo.findAll();
       return events;
    }

    
    public ByteArrayResource fetchImages(Long eventId){

        String path = eventRepo.fetchEventImageUrls(eventId);

    try {
            if (path != null && !path.isEmpty()) {
                Path fileLocation = new File(path).toPath();
                return new ByteArrayResource(Files.readAllBytes(fileLocation));
            }
        } catch (Exception e) {
        }
        return null;

    }
}
