package com.allstate.acceptance;

import com.allstate.model.User;
import com.allstate.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.fluentlenium.adapter.junit.FluentTest;
import org.fluentlenium.core.hook.wait.Wait;
import org.hamcrest.CoreMatchers;
import org.junit.Assert;
import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT)
@Wait
public class UserAcceptanceTest extends FluentTest {
    @Autowired
    private UserRepository repository;

    ObjectMapper mapper;

    @Value("${local.server.port}")
    private String port;

    @Before
    public void before() {
        mapper = new ObjectMapper();
    }

    @After
    public void after() { repository.deleteAll(); }

    @Test
    public void testClickSignUpButton() throws Exception {
        goTo("http://localhost:" + this.port + "/");
        String text = $("#signUp").text();
        Assert.assertEquals("Given I'm on the home page, I have the option to register", "Sign Up", text);
    }

    @Rollback
    @Test
    public void testFormToRegisterOnHomePage() throws Exception {
        goTo("http://localhost:" + this.port + "/");
        User user = new User("test@example.com", "password");
        user.setId(1L);

        $("#signUp").click();

        $("#userEmail").write("test@example.com");
        $("#userPassword").write("password");
        $("#userPasswordConfirm").write("password");
        $("form").submit();

        await().until(() -> $("#board").present());

        User newUser = repository.findOne(1L);
        String actual = mapper.writeValueAsString(newUser);
        String expected = mapper.writeValueAsString(user);

        Assert.assertEquals("Given that a form is completed, a user should be saved to the db", expected, actual);
    }

    @Rollback
    @Test
    public void testGuestCantLogIn()  {
        goTo("http://localhost:" + this.port + "/");

        $("#userEmail").write("test@example.com");
        $("#userPassword").write("password");
        $("form").submit();

        Assert.assertEquals("Should not have any users", 0, repository.count());

        await().until(() -> $("#loginErrorMessage").text() != "");

        String errorMessageActual = $("#loginErrorMessage").text();
        System.out.println($("#loginErrorMessage").tagNames());
        String errorMessageExpected  = "User not found. Please re-enter your credentials or sign up.";
        Assert.assertThat(errorMessageActual, CoreMatchers.containsString(errorMessageExpected));
    }

    @Test
    public void testStartingBoardShowsUp() throws Exception {
        goTo("http://localhost:" + this.port + "/");
    }

    @Rollback
    @Test
    public void testUserCantSignUpWithSameEmail() {
        goTo("http://localhost:" + this.port + "/");

        $("#signUp").click();

        $("#userEmail").write("test@example.com");
        $("#userPassword").write("password");
        $("#userPasswordConfirm").write("password");
        $("form").submit();

        await().until(() -> $("#board").present());

        goTo("http://localhost:" + this.port + "/");

        $("#signUp").click();

        $("#userEmail").write("test@example.com");
        $("#userPassword").write("password");
        $("#userPasswordConfirm").write("password");
        $("form").submit();

        Assert.assertEquals("Should not be able to create users with duplicate emails", 1, repository.count());

        await().until(() -> $("#errorMessage").text() != "");

        String errorMessageActual = $("#errorMessage").text();

        String errorMessageExpected  = "This email has already been used. Please use a different email or click forgot password to recover your account.";

        Assert.assertThat(errorMessageActual, CoreMatchers.containsString(errorMessageExpected));
    }
}
