package com.mitrais.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/page")
public class PageController {

    @RequestMapping({"", "/", "register"})
    public String registerPage() {
        return "register";
    }

    @RequestMapping("/login")
    public String loginPage() {
        return "login";
    }
}
