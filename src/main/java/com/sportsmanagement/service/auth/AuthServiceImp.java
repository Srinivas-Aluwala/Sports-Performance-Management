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
import org.springframework.http.HttpHeaders;
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

import com.sportsmanagement.VO.AdminUIVO;
import com.sportsmanagement.VO.AthletesUIVO;
import com.sportsmanagement.VO.AthletesVO;
import com.sportsmanagement.VO.CoachesUIVO;
import com.sportsmanagement.VO.CoachesVO;
import com.sportsmanagement.VO.StatusVO;
import com.sportsmanagement.VO.UsersVO;
import com.sportsmanagement.dto.AthleteSignupDTO;
import com.sportsmanagement.dto.CoacheSignupDTO;
import com.sportsmanagement.dto.UserLoginDTO;
import com.sportsmanagement.dto.UsersSignupDTO;
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

                MultipartFile file = imageFile;
                String fileName = file.getOriginalFilename();

                File image = new File("E:\\SportsManagement\\coache", fileName);

                try {

                    file.transferTo(image);
                } catch (Exception e) {

                }
                String imagePath = image.getAbsolutePath();

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
        // String fileName = file.getOriginalFilename();
        // String userId = fileName.substring(0, fileName.indexOf("_"));
        // Path folderPath = Paths.get(audioFilePath, userId.toString());
        // Path filePath = folderPath.resolve(file.getOriginalFilename());
        // file.transferTo(filePath.toFile());
        File image = null;

        try {
            Path folderPath = Paths.get("E:\\SportsManagement\\users\\images", String.valueOf(userId));
            Files.createDirectories(folderPath);
            Path filePath = folderPath.resolve(fileName);
            image = filePath.toFile();
            file.transferTo(image);
        } catch (Exception e) {

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

            String jwt = jwtService.GenerateToken(authRequestDTO.getUsername());

            ResponseCookie cookie = ResponseCookie.from("access_token", jwt)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .sameSite("Strict")
                    .maxAge(Duration.ofHours(1))
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

                                        System.out.println(responseAdmin + "    " + responseCoache + "   " + responseAthlete );

            if (responseCoache != null) {

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, cookie.toString())
                        .body(responseCoache);

            } else if(responseAthlete != null) {

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, cookie.toString())
                        .body(responseAthlete);
            }else {

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, cookie.toString())
                        .body(responseAdmin);
            }

        } else {
            throw new UsernameNotFoundException("invalid user request..!!");
        }

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
        System.out.println("value  -  " +value);
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
