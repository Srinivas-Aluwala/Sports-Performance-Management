package com.sportsmanagement.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sportsmanagement.modal.Events;

import jakarta.transaction.Transactional;

@Repository
public interface EventsRepository extends CrudRepository<Events, Long> {

    
    @Modifying
    @Transactional
    @Query("UPDATE Events a SET a.photoUrl = :photoUrl WHERE a.eventId = :eventId")
    int updatePhotoUrlByEventId(@Param("photoUrl") String photoUrl, @Param("eventId") long eventId);


}
