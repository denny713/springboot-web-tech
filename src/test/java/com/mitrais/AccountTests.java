package com.mitrais;

import com.mitrais.controller.AccountController;
import com.mitrais.entity.Account;
import com.mitrais.model.Acc;
import com.mitrais.model.Login;
import com.mitrais.model.Response;
import com.mitrais.service.AccountService;
import com.mitrais.util.Encrypt;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class AccountTests {

    @Autowired
    private AccountController accController;

    private Response response = new Response();
    private Login login = new Login();

    @Test
    public void encryptPass() throws NoSuchAlgorithmException {
        String text = "mitrais";
        assertEquals("f6a031bb523cd1583e692e9245c51218923b1cb64c27db82144f6c6cf52922e7", Encrypt.encryptText(text));
    }

    public Acc setValue() throws ParseException {
        Acc acc = new Acc();
        acc.setPhone("085716571131");
        acc.setFirstName("Denny");
        acc.setLastName("Afrizal");
        acc.setGender("Male");
        acc.setBirthDate(new SimpleDateFormat("yyyy-MM-dd").parse("1990-04-13"));
        acc.setEmail("denny.afrizal@mail.com");
        acc.setPassword("mitrais");
        return acc;
    }

    @Test
    public void saveUser() throws ParseException {
        response = accController.saveAccount(setValue());
        assertTrue(response.getResult());
    }

    public void saveInit() throws ParseException {
        response = accController.saveAccount(setValue());
    }

    @Test
    public void checkLoginByPhone() throws ParseException {
        saveInit();
        login.setUsername("085716571131");
        login.setPassword("mitrais");
        response = accController.login(login);
        assertTrue(response.getResult());
    }

    @Test
    public void checkLoginByEmail() throws ParseException {
        saveInit();
        login.setUsername("denny.afrizal@mail.com");
        login.setPassword("mitrais");
        response = accController.login(login);
        assertTrue(response.getResult());
    }
}
