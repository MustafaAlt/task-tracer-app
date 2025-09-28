package com.tasktracer.controller.TaskControllerImpl;

import com.tasktracer.controller.ITaskController;
import com.tasktracer.model.Task;
import com.tasktracer.service.ITaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskControllerImpl implements ITaskController {

    @Autowired
    private ITaskService taskService;

    @Override
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @Override
    @GetMapping(path = "/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @Override
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @Override
    @PutMapping(path = "/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @Override
    @DeleteMapping(path = "/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
    @GetMapping("/my-tasks/{username}") // Yeni endpoint
    public List<Task> getTasksByAssignee(@PathVariable String username) {
        return taskService.getTasksByAssignee(username);
    }
}