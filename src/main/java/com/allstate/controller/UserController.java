package com.allstate.controller;

import com.allstate.model.User;
import com.allstate.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) { this.repository = repository; }

    @PostMapping("")
    public User registerUser(@RequestBody User user) {
        this.repository.save(user);
        return user;
    }
}
