package com.sportsmanagement.service.publicEndpoints;

import java.util.List;

import com.sportsmanagement.modal.Events;

public interface PublicService {

    List<Events> fetchEvents();

}
