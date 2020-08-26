package com.mitrais.model;

import lombok.Data;

import java.util.Date;

@Data
public class Acc {

    private String phone;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private Date birthDate;
    private String gender;
}
