package com.sportsmanagement.repo;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.sportsmanagement.modal.UserRole;

public interface UserRolesRepository  extends CrudRepository<UserRole, Long>{

    public Optional<UserRole> findByRoleName (String rolename);
}
