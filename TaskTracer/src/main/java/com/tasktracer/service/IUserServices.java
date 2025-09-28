package com.tasktracer.service;

import com.tasktracer.model.User;

public interface IUserServices {
    User register(User user);
    User login(String username, String password);
}
