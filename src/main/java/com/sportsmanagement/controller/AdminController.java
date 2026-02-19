package com.sportsmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sportsmanagement.VO.auth.StatusVO;
import com.sportsmanagement.dto.admin.CreateEventDTO;
import com.sportsmanagement.dto.admin.CreateMeetDTO;
import com.sportsmanagement.service.admin.AdminServiceImp;

@RestController
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminServiceImp adminService;


        @PostMapping(value = "/createEvent", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public StatusVO addEvent(@RequestPart("createEventDTO") CreateEventDTO createEventDTO, @RequestPart("photoURL") MultipartFile photoURL){
            try {

                return adminService.addEvent(createEventDTO, photoURL);

            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("User authentication failed: " + e.getMessage());
            }

        }
    
        
        @PostMapping("/createMeet")
        public StatusVO addMeet(@RequestBody CreateMeetDTO createMeetDTO){
            try {

                return adminService.addMeet(createMeetDTO);

            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("User authentication failed: " + e.getMessage());
            }

        }


}
