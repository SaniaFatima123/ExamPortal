package com.examportal.backend;

import com.examportal.backend.models.Role;
import com.examportal.backend.models.User;
import com.examportal.backend.models.UserRole;
import com.examportal.backend.service.impl.UserDetailsServiceImpl;
import com.examportal.backend.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private UserServiceImpl userService;
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("starting code...");

//		//hardcode users....ADMIN
//		User user = new User();
//
//		user.setFirstName("Sania");
//		user.setLastName("Fatima");
//		user.setUsername("sania123");
//		user.setPassword(this.bCryptPasswordEncoder.encode("123456"));
//		user.setEmail("sania@gmail.com");
//		user.setProfile("default.png");
//
//		Role role1 = new Role();
//		role1.setRoleId(7L);
//		role1.setRoleName("ADMIN");
//
//		Set<UserRole> userRoleSet = new HashSet<>();
//		UserRole userRole = new UserRole();
//
//		userRole.setRole(role1);
//
//		userRole.setUser(user);
//
//		userRoleSet.add(userRole);
//
//		User user1 = this.userService.createUser(user,userRoleSet);
//		System.out.println(user1.getUsername());

	}
}
