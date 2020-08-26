package com.mitrais.repository;

import com.mitrais.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    public Account findByPhone(String phone);

    public Account findByEmail(String email);
}
