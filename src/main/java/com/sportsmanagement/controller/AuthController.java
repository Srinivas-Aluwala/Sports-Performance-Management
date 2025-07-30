package com.sportsmanagement.controller;

import java.net.http.HttpRequest;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sportsmanagement.VO.StatusVO;
import com.sportsmanagement.dto.UserLoginDTO;
import com.sportsmanagement.dto.UsersSignupDTO;
import com.sportsmanagement.security.UserDetailsServiceImpl;
import com.sportsmanagement.service.auth.AuthServiceImp;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthServiceImp userService;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public StatusVO userRegister(@RequestPart("usersSignupDTO") UsersSignupDTO usersSignupDTO,
            @RequestPart("imageFile") MultipartFile imageFile) {

        try {
            System.out.println(usersSignupDTO + " " + imageFile);

            return userService.addUser(usersSignupDTO, imageFile);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("User creation failed: " + e.getMessage());
        }

    }

    @PostMapping(value = "/adminRegister")
    public StatusVO userRegister(@RequestBody UsersSignupDTO usersSignupDTO, HttpServletRequest request) {

      

        try {
            System.out.println(usersSignupDTO);

            return userService.addAdmin(usersSignupDTO, request);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("User creation failed: " + e.getMessage());
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> AuthenticateAndGetToken(@RequestBody UserLoginDTO authRequestDTO) {

        try {

            return userService.authenticateUser(authRequestDTO);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("User authentication failed: " + e.getMessage());
        }

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        SecurityContextHolder.clearContext();

        // HttpSession session = request.getSession(false);
        // if (session != null) {
        // session.invalidate();
        // }

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

    @GetMapping("/fetchUsernames")
    public List<String> fetchUsenames() {
        try {

            return userService.fetchUsernames();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Fetching Usernames Failed: " + e.getMessage());
        }
    }

}