package com.sportsmanagement.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sportsmanagement.modal.Users;


@Repository
public interface UsersRepository extends CrudRepository<Users, Long> {

        public Users findByUsername(String username);

        @Query("SELECT u.username FROM Users u")
        public List<String> findAllUsernames();

        public int deleteById(long userId);

}
