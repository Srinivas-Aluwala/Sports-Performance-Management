package com.sportsmanagement.schedular;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.sportsmanagement.service.email.EmailSenderService;

@Service
public class EmailSchedular {

    
	@Autowired
	public EmailSenderService emailSenderService;
	

    // @Scheduled(cron = "* 0/1 * * * *")
    // public void sendMail(){

	// emailSenderService.sendEmail("my133name@gmail.com", "Test mails", "hello this email was sent through a java project ");

	// }

}
