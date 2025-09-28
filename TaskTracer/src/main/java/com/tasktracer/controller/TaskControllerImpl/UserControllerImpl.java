package com.tasktracer.controller.TaskControllerImpl;

import com.tasktracer.controller.IUserController;
import com.tasktracer.model.User;
import com.tasktracer.service.IUserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserControllerImpl implements IUserController {


    @Autowired
    private IUserServices userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestParam String username,
                      @RequestParam String password) {
        return userService.login(username, password);
    }
}
