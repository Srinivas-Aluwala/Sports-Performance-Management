package com.sportsmanagement.service;

import java.util.List;

import com.sportsmanagement.modal.UserInfo;
import com.sportsmanagement.modal.UserRole;

public interface UserService  {

    public UserInfo addUser(UserInfo userInfo, List<UserRole> roles);

}
