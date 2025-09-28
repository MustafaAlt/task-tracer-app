package com.tasktracer.controller;

import com.tasktracer.model.User;
import com.tasktracer.model.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface ITaskController {
    @GetMapping()
    List<Task> getAllTasks();
    @GetMapping(path = "/{id}")
    Task getTaskById(@PathVariable Long id);
    @PostMapping
    Task createTask(@RequestBody Task task);
    @PutMapping(path = "/{id}")
    Task updateTask(@PathVariable Long id, @RequestBody Task task);
    @DeleteMapping(path = "/{id}")
    void deleteTask(@PathVariable Long id);
    @GetMapping("/my-tasks/{username}") // Yeni endpoint
    public List<Task> getTasksByAssignee(@PathVariable String username);
}
