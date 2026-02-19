package com.sportsmanagement.repo;

import org.springframework.data.repository.CrudRepository;

import com.sportsmanagement.modal.Meets;

public interface MeetRepository extends CrudRepository<Meets,Long>{

}
