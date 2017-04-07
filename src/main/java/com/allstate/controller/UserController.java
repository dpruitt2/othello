package com.allstate.controller;

import com.allstate.exception.UserNotFoundException;
import com.allstate.model.ErrorResponse;
import com.allstate.model.User;
import com.allstate.repository.UserRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sendgrid.*;
import java.io.IOException;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repository;
    private String subject;
    private String content;

    public UserController(UserRepository repository) { this.repository = repository; }

    public static void sendEmail(User user, String subject, String content) throws IOException{
        Email from = new Email("hello@othello.com");
        String emailSubject = subject;
        Email to = new Email(user.getEmail());
        Content emailContent = new Content("text/plain", content);
        Mail mail = new Mail(from, emailSubject, to, emailContent);

        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request request = new Request();
        try {
            request.method = Method.POST;
            request.endpoint = "mail/send";
            request.body = mail.build();
            Response response = sg.api(request);
            System.out.println(response.statusCode);
            System.out.println(response.body);
            System.out.println(response.headers);
        } catch (IOException ex) {
            throw ex;
        }
    }


    @PostMapping("")
    public User registerUser(@RequestBody User user) throws Exception {
        this.repository.save(user);
        subject = "Welcome";
        content = "Welcome to Othello";
        UserController.sendEmail(user, subject, content);
        return user;
    }

    @PostMapping("/validate")
    public User loginUser(@RequestBody User user) throws Exception{
        String searchEmail = user.getEmail();
        String userPassword = user.getPassword();

        User findUser = this.repository.findByEmail(searchEmail);
        if (findUser != null) {
            if (findUser.getPassword().contentEquals(userPassword)) {
                return findUser;
            }
        }

        throw new Exception("User doesn't exits");
    }

    @PostMapping("/forgotPassword")
    public void userForgotPassword(@RequestBody User user) throws IOException{
        String searchEmail = user.getEmail();
        subject = "Forgot email?";

        User findUser = this.repository.findByEmail(searchEmail);
          if (findUser != null) {
            content = "Your new password is " + findUser.getPassword();
            UserController.sendEmail(user, subject, content);
        }


    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> exceptionHandler(Exception ex) {
        ErrorResponse error = new ErrorResponse();
        error.setMessage("This email address already exists");
        error.setErrorCode(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(error, error.getErrorCode());
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> userNotFound (Exception ex) {
        ErrorResponse error = new ErrorResponse();
        error.setMessage("This email address already exists");
        error.setErrorCode(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(error, error.getErrorCode());
    }
}
