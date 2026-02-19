package com.sportsmanagement.service.auth;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.sportsmanagement.VO.auth.AdminUIVO;
import com.sportsmanagement.VO.auth.AthletesUIVO;
import com.sportsmanagement.VO.auth.AthletesVO;
import com.sportsmanagement.VO.auth.CoachesUIVO;
import com.sportsmanagement.VO.auth.CoachesVO;
import com.sportsmanagement.VO.auth.StatusVO;
import com.sportsmanagement.VO.auth.UsersVO;
import com.sportsmanagement.dto.auth.AthleteSignupDTO;
import com.sportsmanagement.dto.auth.CoacheSignupDTO;
import com.sportsmanagement.dto.auth.UserLoginDTO;
import com.sportsmanagement.dto.auth.UsersSignupDTO;
import com.sportsmanagement.modal.Athletes;
import com.sportsmanagement.modal.Coaches;
import com.sportsmanagement.modal.UserRole;
import com.sportsmanagement.modal.Users;
import com.sportsmanagement.repo.AthleteRepository;
import com.sportsmanagement.repo.CoacheRepository;
import com.sportsmanagement.repo.UserRolesRepository;
import com.sportsmanagement.repo.UsersRepository;
import com.sportsmanagement.security.JwtService;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuthServiceImp implements AuthService {

    @Autowired
    UsersRepository userRepo;

    @Autowired
    AthleteRepository athleteRepo;

    @Autowired
    CoacheRepository coacheRepo;

    @Autowired
    UserRolesRepository userRoleRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;


    private final String storagePath;


    @Autowired
    public AuthServiceImp(String storagePath){

        this.userRepo = userRepo;
        this.athleteRepo = athleteRepo;
        this.coacheRepo = coacheRepo;
        this.userRoleRepo = userRoleRepo;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.storagePath = storagePath;
    }

    @Override
    public StatusVO addUser(UsersSignupDTO usersSignupDTO, @RequestParam MultipartFile imageFile) {
        System.out.println(usersSignupDTO + "usersSignupDTO");

        String userRole = usersSignupDTO.getRole();

        AthleteSignupDTO athleteSignupDTO = usersSignupDTO.getAthlete();
        CoacheSignupDTO coacheSignupDTO = usersSignupDTO.getCoache();

        Athletes saveAthlete = new Athletes();
        Coaches saveCoache = new Coaches();

        Optional<UserRole> usrrle = userRoleRepo.findByRoleName(userRole);

        if (usrrle == null) {
            return StatusVO.builder()
                    .statusId(0)
                    .statusMessage("User Registration failed Invadlid Roles")
                    .build();
        }

        UserRole ds = usrrle.get();

        Users saveUser = Users.builder()
                .username(usersSignupDTO.getUsername())
                .roles(new HashSet<>())
                .build();

        saveUser.setPassword(new BCryptPasswordEncoder().encode(usersSignupDTO.getPassword()));
        saveUser.getRoles().add(ds);

        switch (userRole) {
            case "athlete": {

                saveAthlete = Athletes.builder()
                        .firstName(athleteSignupDTO.getFirstname())
                        .lastName(athleteSignupDTO.getLastname())
                        .email(athleteSignupDTO.getEmail())
                        .height(athleteSignupDTO.getHeight())
                        .weight(athleteSignupDTO.getWeight())
                        .gender(athleteSignupDTO.getGender())
                        .category(athleteSignupDTO.getCategory())
                        .birthDate(athleteSignupDTO.getBirthDate())
                        .photoUrl("")
                        .build();

                saveUser.setAthlete(saveAthlete);
            }
                break;

            case "coache": {

                // MultipartFile file = imageFile;
                // String fileName = file.getOriginalFilename();

                // File image = new File("E:\\SportsManagement\\coache", fileName);

                // try {

                //     file.transferTo(image);
                // } catch (Exception e) {

                // }
                // String imagePath = image.getAbsolutePath();

                saveCoache = Coaches.builder()
                        .firstName(coacheSignupDTO.getFirstname())
                        .lastName(coacheSignupDTO.getLastname())
                        .email(coacheSignupDTO.getEmail())
                        .gender(coacheSignupDTO.getGender())
                        .category(coacheSignupDTO.getCategory())
                        .birthDate(coacheSignupDTO.getBirthDate())
                        .photoUrl("")
                        .build();

                saveUser.setCoache(saveCoache);
            }
                break;

            default:
                break;
        }

        Users user = userRepo.save(saveUser);

        MultipartFile file = imageFile;
        String fileName = file.getOriginalFilename();
        long userId = user.getUserId();
        File image = null;

        try {
            String subFolder = "users/images/" + String.valueOf(userId);
            Path folderPath = Paths.get(storagePath, subFolder);
            Files.createDirectories(folderPath);
            Path filePath = folderPath.resolve(fileName);
            image = filePath.toFile();
            file.transferTo(image);
        } catch (Exception e) {

            userRepo.deleteById(userId);

            return StatusVO.builder()
                .statusId(0)
                .statusMessage("User Registration failed")
                .build();

        }

        String filePath = image.getAbsolutePath();

        int saveSuccess;

        if (user.getAthlete() != null) {
            saveSuccess = athleteRepo.updatePhotoUrlByAthleteId(filePath, user.getAthlete().getAthleteId());

        } else {
            saveSuccess = coacheRepo.updatePhotoUrlByCoacheId(filePath, user.getCoache().getCoacheId());
        }

        if (saveSuccess == 1) {





            
            return StatusVO.builder()
                    .statusId(1)
                    .statusMessage("User Registration successfull")
                    .build();
        } else {
            userRepo.deleteById(userId);
        }

        return StatusVO.builder()
                .statusId(0)
                .statusMessage("User Registration failed")
                .build();

    }

    @Override
    public ResponseEntity<?> authenticateUser(UserLoginDTO authRequestDTO) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));

        System.out.println(authentication + " authentication");

        if (authentication.isAuthenticated()) {

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String access_jwt = jwtService.GenerateToken(authRequestDTO.getUsername());

            String refresh_jwt = jwtService.GenerateRefreshToken(authRequestDTO.getUsername());

            ResponseCookie access_cookie = ResponseCookie.from("access_token", access_jwt)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .sameSite("Strict")
                    .maxAge(Duration.ofMinutes(30))
                    .build();

            ResponseCookie refresh_cookie = ResponseCookie.from("refresh_token", refresh_jwt)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .sameSite("Strict")
                    .maxAge(Duration.ofDays(7))
                    .build();

            UsersVO userDetails = (UsersVO) authentication.getPrincipal();

            System.out.println(userDetails + " userDetails");
            String userRole = userDetails.getRoles().iterator().next().getRoleName();

            AthletesVO athleteDetails = userDetails.getAthlete();
            CoachesVO coacheDetails = userDetails.getCoache();

            AthletesUIVO responseAthlete = null;
            CoachesUIVO responseCoache = null;
            AdminUIVO responseAdmin = null;

            switch (userRole) {
                case "athlete": {

                    responseAthlete = AthletesUIVO.builder()
                            .userId(userDetails.getUserId())
                            .athleteId(athleteDetails.getAthleteId())
                            .username(userDetails.getUsername())
                            .firstName(athleteDetails.getFirstName())
                            .lastName(athleteDetails.getLastName())
                            .height(athleteDetails.getHeight())
                            .weight(athleteDetails.getWeight())
                            .gender(athleteDetails.getGender())
                            .category(athleteDetails.getCategory())
                            .birthDate(athleteDetails.getBirthDate())
                            .photoUrl(athleteDetails.getPhotoUrl())
                            .roles(userDetails.getRoles())
                            .build();
                }
                    break;

                case "coache": {

                    responseCoache = CoachesUIVO.builder()
                            .userId(userDetails.getUserId())
                            .coacheId(coacheDetails.getCoacheId())
                            .username(userDetails.getUsername())
                            .firstName(coacheDetails.getFirstName())
                            .lastName(coacheDetails.getLastName())
                            .gender(coacheDetails.getGender())
                            .category(coacheDetails.getCategory())
                            .birthDate(coacheDetails.getBirthDate())
                            .photoUrl(coacheDetails.getPhotoUrl())
                            .roles(userDetails.getRoles())
                            .build();

                }
                    break;
                case "admin": {
                    responseAdmin = AdminUIVO.builder()
                            .userId(userDetails.getUserId())
                            .username(userDetails.getUsername())
                            .roles(userDetails.getRoles())
                            .build();
                    System.out.println(responseAdmin);

                }
                    break;

                default:
                    break;
            }

            if (responseCoache != null) {

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, access_cookie.toString(), refresh_cookie.toString())
                        .body(responseCoache);

            } else if (responseAthlete != null) {

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, access_cookie.toString(), refresh_cookie.toString())
                        .body(responseAthlete);
            } else {

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, access_cookie.toString(), refresh_cookie.toString())
                        .body(responseAdmin);
            }

        } else {
            throw new UsernameNotFoundException("invalid user request..!!");
        }

    }

    @Override
    public ResponseEntity<?> reAuthenticateUser(String refreshToken) {

        if (refreshToken == null || !(jwtService.isRefreshTokenValid(refreshToken))) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token");
        }

        String username = jwtService.extractUsername(refreshToken);

        String access_jwt = jwtService.GenerateToken(username);

        String refresh_jwt = jwtService.GenerateRefreshToken(username);

        ResponseCookie access_cookie = ResponseCookie.from("access_token", access_jwt)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("Strict")
                .maxAge(Duration.ofMinutes(30))
                .build();

        ResponseCookie refresh_cookie = ResponseCookie.from("refresh_token", refresh_jwt)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("Strict")
                .maxAge(Duration.ofDays(7))
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, access_cookie.toString(), refresh_cookie.toString())
                .body("Token Refreshed. ");
    }

    @Override
    public List<String> fetchUsernames() {
        return userRepo.findAllUsernames();
    }

    @Override
    public StatusVO addAdmin(UsersSignupDTO usersSignupDTO, HttpServletRequest request) {
        System.out.println(usersSignupDTO + " - usersSignupDTO");

        String secret = "admin";

        String value = request.getHeader("admin");
        System.out.println("value  -  " + value);
        if (secret.equals(value)) {

            String userRole = usersSignupDTO.getRole();

            Optional<UserRole> usrrle = userRoleRepo.findByRoleName(userRole);

            if (usrrle == null) {
                return StatusVO.builder()
                        .statusId(0)
                        .statusMessage("User Registration failed Invadlid Roles")
                        .build();
            }

            UserRole ds = usrrle.get();

            Users saveUser = Users.builder()
                    .username(usersSignupDTO.getUsername())
                    .roles(new HashSet<>())
                    .build();

            saveUser.setPassword(new BCryptPasswordEncoder().encode(usersSignupDTO.getPassword()));
            saveUser.getRoles().add(ds);
            System.out.println(saveUser);
            Users user = userRepo.save(saveUser);

            if (user != null) {
                return StatusVO.builder()
                        .statusId(1)
                        .statusMessage("User Registration successfull")
                        .build();
            }
        }
        return StatusVO.builder()
                .statusId(0)
                .statusMessage("User Registration failed")
                .build();
    }

}
