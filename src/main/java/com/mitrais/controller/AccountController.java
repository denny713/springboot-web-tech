package com.mitrais.controller;

import com.mitrais.entity.Account;
import com.mitrais.model.Acc;
import com.mitrais.model.Login;
import com.mitrais.model.Response;
import com.mitrais.service.AccountService;
import com.mitrais.util.Encrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    private Response response = new Response();

    @PostMapping("/login")
    @ResponseBody
    public Response login(@Valid @RequestBody Login login) {
        response = accountService.checkLogin(login);
        return response;
    }

    @PostMapping("/save")
    @ResponseBody
    public Response saveAccount(@Valid @RequestBody Acc account) {
        try {
            Account acct = new Account();
            acct.setPhone(account.getPhone());
            acct.setEmail(account.getEmail());
            acct.setFirstName(account.getFirstName());
            acct.setLastName(account.getLastName());
            acct.setBirthDate(account.getBirthDate());
            acct.setGender(account.getGender());
            acct.setPassword(Encrypt.encryptText(account.getPassword()));
            accountService.saveAccount(acct);
            response.setResult(true);
            response.setMessage("Success Save");
        } catch (Exception g) {
            response.setResult(false);
            response.setMessage(g.getMessage());
        }
        return response;
    }
}
