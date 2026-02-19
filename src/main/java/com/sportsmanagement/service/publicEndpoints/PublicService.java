package com.sportsmanagement.service.publicEndpoints;

import java.util.List;

import org.springframework.core.io.ByteArrayResource;

import com.sportsmanagement.modal.Events;

public interface PublicService {

   public List<Events> fetchEvents();
   public ByteArrayResource fetchImages(Long eventId);

}
