package com.sportsmanagement.service.admin;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sportsmanagement.VO.auth.StatusVO;
import com.sportsmanagement.dto.admin.CreateEventDTO;
import com.sportsmanagement.dto.admin.CreateMeetDTO;
import com.sportsmanagement.modal.Events;
import com.sportsmanagement.modal.Meets;
import com.sportsmanagement.repo.EventsRepository;
import com.sportsmanagement.repo.MeetRepository;

@Service
public class AdminServiceImp implements AdminService {

    @Autowired
    private EventsRepository eventRepo;

      @Autowired
    private MeetRepository meetRepo;

    private String storagePath;

    @Autowired
    public AdminServiceImp(EventsRepository eventRepo, String storagePath, MeetRepository meetRepo) {

        this.eventRepo = eventRepo;
        this.meetRepo = meetRepo;
        this.storagePath = storagePath;
    }

    @Override
    public StatusVO addEvent(CreateEventDTO createEventDTO, MultipartFile photoURL) {

        Events saveEvent = Events.builder()
                .eventName(createEventDTO.getEventName())
                .eventDate(createEventDTO.getEventDate())
                .category(createEventDTO.getCategory())
                .meetName(createEventDTO.getMeetName())
                .description(createEventDTO.getDescription())
                .photoUrl("")
                .build();

        Events savedEvent = eventRepo.save(saveEvent);
        Long eventId = savedEvent.getEventId(); 

        if (savedEvent != null) {

            File image = null;
            MultipartFile file = photoURL;
            String fileName = file.getOriginalFilename();

            try {

                String subFolder = "events/images/" + String.valueOf(eventId);
                Path folderPath = Paths.get(storagePath, subFolder);
                Files.createDirectories(folderPath);
                Path filePath = folderPath.resolve(fileName);
                image = filePath.toFile();
                file.transferTo(image);

            } catch (Exception e) {
               
                eventRepo.deleteById(eventId);
               
                return StatusVO.builder()
                        .statusId(0)
                        .statusMessage("Error Saving event " + e.getMessage())
                        .build();
            }

            String filePath = image.getAbsolutePath();

            

           int  saveSuccess = eventRepo.updatePhotoUrlByEventId(filePath, eventId);

           if(saveSuccess == 1){

            return StatusVO.builder()
                    .statusId(1)
                    .statusMessage("Event saved successfully")
                    .build();
        }
    }

        return StatusVO.builder()
                .statusId(0)
                .statusMessage("Error Saving event")
                .build();
    }

    @Override
    public StatusVO addMeet(CreateMeetDTO createmeetDTO) {

        Meets saveMeet = Meets.builder()
                        .meetName(createmeetDTO.getMeetName())
                        .description(createmeetDTO.getDescription())
                        .build();


        Meets  saveSuccess = meetRepo.save(saveMeet);

        if(saveSuccess.getMeetId() == 0){
        
            return StatusVO.builder()
                .statusId(0)
                .statusMessage("Error Saving event")
                .build();
        }
    
          return StatusVO.builder()
                .statusId(1)
                .statusMessage("Meet saved successfully")
                .build();
    }



    
}
