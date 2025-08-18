package com.sportsmanagement;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SportsManagementApplication {

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
	
}
