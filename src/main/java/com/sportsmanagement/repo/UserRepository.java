package com.sportsmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sportsmanagement.modal.UserInfo;

@Repository
public interface UserRepository extends CrudRepository<UserInfo, Long>{
    public UserInfo findByUsername(String username);
}

