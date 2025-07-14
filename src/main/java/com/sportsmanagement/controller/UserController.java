package com.sportsmanagement.controller;


import java.time.Duration;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sportsmanagement.VO.SignUpUIVO;
import com.sportsmanagement.dto.AuthRequestDTO;
import com.sportsmanagement.dto.JwtResponseDTO;
import com.sportsmanagement.modal.UserInfo;
import com.sportsmanagement.modal.UserRole;
import com.sportsmanagement.security.CustomUserDetails;
import com.sportsmanagement.security.JwtService;
import com.sportsmanagement.security.UserDetailsServiceImpl;
import com.sportsmanagement.service.UserServiceImp;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserServiceImp userService;
  
    
                
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @PostMapping("/register")
    public UserInfo reg(@RequestBody SignUpUIVO signUpUIVO) {

        try {
            return userService.addUser(signUpUIVO.getUserInfo(), signUpUIVO.getUserRole());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("User creation failed: " + e.getMessage());
        }

    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO>  AuthenticateAndGetToken(@RequestBody AuthRequestDTO authRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
            
        if (authentication.isAuthenticated()) {


            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtService.GenerateToken(authRequestDTO.getUsername());

            ResponseCookie cookie = ResponseCookie.from("access_token", jwt)
                                                .httpOnly(true)
                                                .secure(true)
                                                .path("/")
                                                .sameSite("Strict")
                                                .maxAge(Duration.ofHours(1))
                                                .build();


            return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body( new JwtResponseDTO((UserInfo) authentication.getPrincipal()));
        } else {
            throw new UsernameNotFoundException("invalid user request..!!");
        }
    }


    @PostMapping("/logout")
public ResponseEntity<?> logout(HttpServletResponse response) {
    ResponseCookie deleteCookie = ResponseCookie.from("access_token", "")
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(0)
        .sameSite("Strict")
        .build();

    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
        .body("Logged out");
}



}