package com.sportsmanagement.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sportsmanagement.modal.Athletes;

import jakarta.transaction.Transactional;

@Repository
public interface AthleteRepository extends CrudRepository<Athletes, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Athletes a SET a.photoUrl = :photoUrl WHERE a.athleteId = :athleteId")
    int updatePhotoUrlByAthleteId(@Param("photoUrl") String photoUrl, @Param("athleteId") long athleteId);

}
