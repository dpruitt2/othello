package com.allstate.controller;

import com.allstate.model.ErrorResponse;
import com.allstate.model.User;
import com.allstate.repository.UserRepository;
import jdk.nashorn.internal.parser.JSONParser;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) { this.repository = repository; }

    @PostMapping("")
    public User registerUser(@RequestBody User user)   {
        this.repository.save(user);
        return user;
    }

    @PostMapping("/validate")
    public String loginUser(@RequestBody Object user) throws Exception {
        System.out.println("IN THE CONTROLLER MUTHAFUCKAAAAA");
//        Iterable<User> users = this.repository.findAll();

        System.out.println(JSONParser.parse(user).email);

        return "Fuck you";




//        if (this.repository.findByEmail(user.getEmail()) != null) {
//            User findUser = this.repository.findByEmail(user.getEmail());
//            System.out.println("====================" + user.getEmail() + findUser.getEmail());
//            if (findUser.getPassword().contentEquals(user.getPassword())) {
//                return user;
//            }
//            throw new Exception();
//        }
//        else {
//            throw new Exception();
//        }

    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> exceptionHandler(Exception ex) {
        ErrorResponse error = new ErrorResponse();
        error.setMessage("This email address already exists");
        error.setErrorCode(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(error, error.getErrorCode());
    }
}
