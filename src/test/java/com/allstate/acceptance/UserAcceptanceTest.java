package com.allstate.acceptance;

//import com.allstate.repository.UsersRepository;
import com.allstate.model.User;
import com.allstate.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.fluentlenium.adapter.junit.FluentTest;
import org.fluentlenium.core.hook.wait.Wait;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;
import static org.fluentlenium.core.filter.FilterConstructor.withText;
//import static org.fluentlenium.core.filter.FilterConstructor.withText;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT)
//@Wait
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

    @Test
    public void testClickSignUpButton() throws Exception {
        goTo("http://localhost:" + this.port + "/");
        String text = $("#signUp").text();
        Assert.assertEquals("Given I'm on the home page, I have the option to register", "Sign Up", text);
    }

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

        await().until(() -> $("#index").present());

        User newUser = repository.findOne(1L);
        String actual = mapper.writeValueAsString(newUser);
        String expected = mapper.writeValueAsString(user);

        Assert.assertEquals("Given that a form is completed, a user should be saved to the db", expected, actual);
    }

    @Test
    public void testExistingUserCanLogIn() throws Exception {
        goTo("http://localhost:" + this.port + "/");
    }
}
