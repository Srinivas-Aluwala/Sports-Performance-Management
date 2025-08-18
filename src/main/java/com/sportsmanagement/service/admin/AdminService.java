package com.sportsmanagement.service.admin;

import org.springframework.web.multipart.MultipartFile;

import com.sportsmanagement.VO.auth.StatusVO;
import com.sportsmanagement.dto.admin.CreateEventDTO;

public interface AdminService {

    public StatusVO addEvent(CreateEventDTO createEventDTO, MultipartFile photoURL);

}
