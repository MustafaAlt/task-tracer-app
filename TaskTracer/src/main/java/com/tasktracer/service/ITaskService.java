package com.tasktracer.service;

import com.tasktracer.model.Task;
import java.util.List;

public interface ITaskService {
    List<Task> getAllTasks();
    Task getTaskById(Long id);
    Task createTask(Task task);
    Task updateTask(Long id, Task updatedTask);
    void deleteTask(Long id);
    List<Task> getTasksByAssignee(String username);

}