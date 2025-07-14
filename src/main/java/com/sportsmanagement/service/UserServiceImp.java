package com.sportsmanagement.service;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sportsmanagement.modal.UserInfo;
import com.sportsmanagement.modal.UserRole;
import com.sportsmanagement.repo.UserRepository;

@Service
public class UserServiceImp implements UserService {
    
    @Autowired
    UserRepository userRepo;


    @Override
    public UserInfo addUser(UserInfo userInfo, List<UserRole> roles) {
System.out.println(userInfo +"Request obj");
        UserInfo user = UserInfo.builder()
        .username(userInfo.getUsername())
        .password(userInfo.getPassword())
        .firstName(userInfo.getFirstName())
        .lastName(userInfo.getLastName())
        .height(userInfo.getHeight())
        .weight(userInfo.getWeight())
        .gender(userInfo.getGender())
        .birthDate(userInfo.getBirthDate())
        .photoUrl(userInfo.getPhotoUrl())
        .category(userInfo.getCategory())
        .roles(new HashSet<> (roles))
        .build();
System.out.println(user + "before");
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
System.out.println(user + "After");

        return userRepo.save(user);
    }


    
}
