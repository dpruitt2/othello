package com.allstate.controller;

import com.allstate.model.User;
import com.allstate.repository.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.core.IsEqual.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {


    @Autowired
    UserRepository userRepository;

    @Autowired
    MockMvc mockMvc;

    User user;

    @Before
    public void setup() {
//        user = new User();
//        user.setEmail("test@example.com");
//        user.setPassword("password");
    }

    @After
    public void tearDown() {
       // userRepository.deleteAll();
    }

    @Test
    @Transactional
    @Rollback
    public void testLoginUser() throws Exception {
        MockHttpServletRequestBuilder request = post("/users/validate")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"doesntexist@example.com\",\"password\": \"wrongpassword\"}");

        this.mockMvc.perform(request)
                .andExpect(status().isBadRequest());

    }

    @Test
    @Transactional
    @Rollback
    public void testUserRegister() throws Exception {
        MockHttpServletRequestBuilder request = post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"test@example.com\",\"password\": \"password\", \"password_confirmation\": \"password\"}");

        this.mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email", equalTo("test@example.com")))
                .andExpect(jsonPath("$.password", equalTo("password")));
    }
//
//    @Test
//    @Transactional
//    @Rollback
//    public void testForgotPassword() throws Exception {
//        MockHttpServletRequestBuilder request = post("/users/forgotPassword")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content("{\"email\": \"test@example.com\"");
//
//        this.mockMvc.perform(request)
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.email", equalTo("test@example.com")));
//    }

    @Test
    @Transactional
    @Rollback
    public void testEmailValidation() throws Exception {

        MockHttpServletRequestBuilder request1 = post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"test@example.com\",\"password\": \"password\", \"password_confirmation\": \"password\"}");

        this.mockMvc.perform(request1)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email", equalTo("test@example.com")))
                .andExpect(jsonPath("$.password", equalTo("password")));

        MockHttpServletRequestBuilder request2 = post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"test@example.com\",\"password\": \"password\", \"password_confirmation\": \"password\"}");

        this.mockMvc.perform(request2)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo("This email address already exists")));
    }
}
