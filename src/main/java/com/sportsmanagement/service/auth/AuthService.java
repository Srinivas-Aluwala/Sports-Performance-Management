package com.sportsmanagement.service.auth;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.sportsmanagement.VO.StatusVO;
import com.sportsmanagement.dto.UserLoginDTO;
import com.sportsmanagement.dto.UsersSignupDTO;

import jakarta.servlet.http.HttpServletRequest;


public interface AuthService  {

    public ResponseEntity<?> authenticateUser(UserLoginDTO authRequestDTO);

    public StatusVO addUser(UsersSignupDTO usersSignupDTO, MultipartFile imageFile);

    public StatusVO addAdmin(UsersSignupDTO usersSignupDTO, HttpServletRequest request );

    public List<String> fetchUsernames();


}
