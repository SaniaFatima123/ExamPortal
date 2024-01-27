package com.examportal.backend.controller;

import com.examportal.backend.exceptions.UserNotFoundException;
import com.examportal.backend.models.Role;
import com.examportal.backend.models.User;
import com.examportal.backend.models.UserRole;
import com.examportal.backend.repository.UserRepository;
import com.examportal.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private IUserService userService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserRepository imageRepository;

    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {
//        user.setProfile("default.png");

        //encoding password with bcryptpasswordencoder
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
        Set<UserRole> userRoles = new HashSet<>();

        Role role1 = new Role();
        role1.setRoleId(45L);
        role1.setRoleName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role1);

        userRoles.add(userRole);

        User response = userService.createUser(user, userRoles);
        return response;
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username) throws Exception {
        return userService.getUser(username);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
    }

//    @PostMapping("/upload")
//    public ResponseEntity.BodyBuilder uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
//
//        System.out.println("Original Image Byte Size - " + file.getBytes().length);
//        User user = new User();
//        user.setProfile(file.getBytes());
//
//        imageRepository.save(user);
//        return ResponseEntity.status(HttpStatus.OK);
//    }

//    @GetMapping(path = { "/get/{id}" })
//    public User getImage(@PathVariable("id") Long id) throws IOException {
//
//        final Optional<User> requestedUser = imageRepository.findById(id);
//        User user = new User();
//        byte[] img = requestedUser.get().getProfile();
//        user.setProfile(img);
//        return user;
//    }
    // compress the image bytes before storing it in the database
//    public static byte[] compressBytes(byte[] data) {
//        Deflater deflater = new Deflater();
//        deflater.setInput(data);
//        deflater.finish();
//
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
//        byte[] buffer = new byte[1024];
//        while (!deflater.finished()) {
//            int count = deflater.deflate(buffer);
//            outputStream.write(buffer, 0, count);
//        }
//        try {
//            outputStream.close();
//        } catch (IOException e) {
//        }
//        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
//
//        return outputStream.toByteArray();
//    }

    // uncompress the image bytes before returning it to the angular application
//    public static byte[] decompressBytes(byte[] data) {
//        Inflater inflater = new Inflater();
//        inflater.setInput(data);
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
//        byte[] buffer = new byte[1024];
//        try {
//            while (!inflater.finished()) {
//                int count = inflater.inflate(buffer);
//                outputStream.write(buffer, 0, count);
//            }
//            outputStream.close();
//        } catch (IOException ioe) {
//        } catch (DataFormatException e) {
//        }
//        return outputStream.toByteArray();
//    }
}
