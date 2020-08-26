package com.mitrais.service.implement;

import com.google.gson.Gson;
import com.mitrais.entity.Account;
import com.mitrais.model.Login;
import com.mitrais.model.Response;
import com.mitrais.repository.AccountRepository;
import com.mitrais.service.AccountService;
import com.mitrais.util.Encrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImplement implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public void saveAccount(Account account) {
        accountRepository.save(account);
    }

    @Override
    public Response checkLogin(Login login) {
        Response response = new Response();
        try {
            boolean cek = false;
            String pass = Encrypt.encryptText(login.getPassword());
            Account account;
            account = accountRepository.findByEmail(login.getUsername());
            if (account != null) {
                cek = true;
            } else {
                account = accountRepository.findByPhone(login.getUsername());
                if (account != null) {
                    cek = true;
                }
            }
            if (cek) {
                if (pass.equals(account.getPassword())) {
                    response.setResult(true);
                    response.setMessage(new Gson().toJson(account));
                } else {
                    response.setResult(false);
                    response.setMessage("Bad Credential");
                }
            } else {
                response.setResult(false);
                response.setMessage("Account " + login.getUsername() + " Not Found");
            }
        } catch (Exception s) {
            response.setResult(false);
            response.setMessage(s.getMessage());
        }
        return response;
    }
}
