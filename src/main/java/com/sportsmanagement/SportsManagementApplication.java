package com.sportsmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.sportsmanagement.service.email.EmailSenderService;

@SpringBootApplication
@EnableScheduling
public class SportsManagementApplication {

	
	@Autowired
	public EmailSenderService emailSenderService;
	

	@Value("${file.storage.windows}")
	private String windowsPath;

	@Value("${file.storage.linux}")
	private String linuxPath;

	public static void main(String[] args) {
		SpringApplication.run(SportsManagementApplication.class, args);
	}

	@Bean
	public String storagePath(){
		String os = System.getProperty("os.name").toLowerCase();
		return os.contains("win") ? windowsPath : linuxPath;
	}
	
	// @EventListener(ApplicationReadyEvent.class)
	// public void sendMail(){

	// emailSenderService.sendEmail("my133name@gmail.com", "Test mails", "hello this email was sent through a java project ");

	// }
	
}
