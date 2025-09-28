package com.tasktracer.controller;

import com.tasktracer.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

public interface IUserController {
    @PostMapping("/register")
    public User registerUser(@RequestBody User user);
    @PostMapping("/login")
    public User login(@RequestParam String username,
                      @RequestParam String password);

}
