package com.mitrais.service;

import com.mitrais.entity.Account;
import com.mitrais.model.Login;
import com.mitrais.model.Response;

import javax.transaction.Transactional;

@Transactional
public interface AccountService {

    public void saveAccount(Account account);

    public Response checkLogin(Login login);
}
