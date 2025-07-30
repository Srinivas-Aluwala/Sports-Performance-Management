package com.sportsmanagement.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sportsmanagement.modal.Coaches;

import jakarta.transaction.Transactional;

@Repository
public interface CoacheRepository extends CrudRepository<Coaches, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE Coaches c SET c.photoUrl = :photoUrl WHERE c.coacheId = :coacheId")
    int updatePhotoUrlByCoacheId(@Param("photoUrl") String photoUrl, @Param("coacheId") long coacheId);

}
