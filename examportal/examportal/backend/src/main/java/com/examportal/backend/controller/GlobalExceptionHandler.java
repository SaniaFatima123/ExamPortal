package com.examportal.backend.controller;

import com.examportal.backend.exceptions.UserAlreadyExists;
import com.examportal.backend.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(UserAlreadyExists.class)
    private String alreadyExistsExceptionHandler(UserAlreadyExists e){
        return e.getMessage();
    }
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserNotFoundException.class)
    private String notFoundExceptionHandler(UserNotFoundException e){
        return e.getMessage();
    }

}
