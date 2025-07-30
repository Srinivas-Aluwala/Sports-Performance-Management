package com.sportsmanagement.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.sportsmanagement.VO.AthletesVO;
import com.sportsmanagement.VO.CoachesVO;
import com.sportsmanagement.VO.UsersVO;
import com.sportsmanagement.modal.Athletes;
import com.sportsmanagement.modal.Coaches;
import com.sportsmanagement.modal.Users;
import com.sportsmanagement.repo.UsersRepository;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UsersRepository userRepo;

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        logger.debug("Entering in loadByUsername Method...");

        Users user = userRepo.findByUsername(username);

        System.out.println(user + " UserDetailsServiceImpl");

        Athletes athlete = user.getAthlete();
        Coaches coache = user.getCoache();

        AthletesVO atheletevo = null;
        if (athlete != null) {

            atheletevo = AthletesVO.builder()
                    .athleteId(athlete.getAthleteId())
                    .firstName(athlete.getFirstName())
                    .lastName(athlete.getLastName())
                    .height(athlete.getHeight())
                    .weight(athlete.getWeight())
                    .gender(athlete.getGender())
                    .category(athlete.getCategory())
                    .birthDate(athlete.getBirthDate())
                    .photoUrl(athlete.getPhotoUrl())
                    .build();
        }
        CoachesVO coachesvo = null;
        if (coache != null) {

            coachesvo = CoachesVO.builder()
                    .coacheId(coache.getCoacheId())
                    .firstName(coache.getFirstName())
                    .lastName(coache.getLastName())
                    .gender(coache.getGender())
                    .category(coache.getCategory())
                    .birthDate(coache.getBirthDate())
                    .photoUrl(coache.getPhotoUrl())
                    .build();
        }

        UsersVO uservo = UsersVO.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRoles())
                .athlete(atheletevo)
                .coache(coachesvo)
                .build();

        if (uservo == null) {
            logger.error("Username not found" + username);
            throw new UsernameNotFoundException("could not found user..!!");
        }

        logger.info("User Authenticated Successfully..!!!");

        System.out.println(uservo + " uservo");

        return new CustomUserDetails(uservo);

    }

}
