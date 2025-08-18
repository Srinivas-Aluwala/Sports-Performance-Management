package com.sportsmanagement.service.auth;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.sportsmanagement.VO.auth.StatusVO;
import com.sportsmanagement.dto.auth.UserLoginDTO;
import com.sportsmanagement.dto.auth.UsersSignupDTO;

import jakarta.servlet.http.HttpServletRequest;


public interface AuthService  {

    public ResponseEntity<?> authenticateUser(UserLoginDTO authRequestDTO);

    public ResponseEntity<?> reAuthenticateUser(String refreshToken);

    public StatusVO addUser(UsersSignupDTO usersSignupDTO, MultipartFile imageFile);

    public StatusVO addAdmin(UsersSignupDTO usersSignupDTO, HttpServletRequest request );

    public List<String> fetchUsernames();


}
