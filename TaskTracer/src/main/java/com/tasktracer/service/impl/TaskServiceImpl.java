package com.tasktracer.service.impl;

import com.tasktracer.model.Task;
import com.tasktracer.model.User;
import com.tasktracer.repository.TaskRepository;
import com.tasktracer.repository.UserRepository;
import com.tasktracer.service.ITaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements ITaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired // Bu satırın doğru bir şekilde eklendiğinden emin ol
    private UserRepository userRepository;

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Görev bulunamadı"));
    }

    @Override
    public Task createTask(Task task) {
        // Frontend'den gelen assignee'nin kullanıcı adını al
        String username = task.getAssignee().getUsername();
        // Bu kullanıcı adıyla veritabanından User objesini bul
        User assignee = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Atanacak kullanıcı bulunamadı"));
        // Task objesinin assignee alanını bulduğumuz User objesiyle doldur
        task.setAssignee(assignee);
        // Task'ı veritabanına kaydet
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, Task updatedTask) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Görev bulunamadı"));

        // Frontend'den gelen assignee'nin kullanıcı adını al
        String username = updatedTask.getAssignee().getUsername();
        // Bu kullanıcı adıyla veritabanından User objesini bul
        User assignee = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Atanacak kullanıcı bulunamadı"));

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setStatus(updatedTask.getStatus());
        existingTask.setAssignee(assignee); // Atanan kişiyi doğru User objesiyle güncelle

        return taskRepository.save(existingTask);
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Silinecek görev bulunamadı");
        }
        taskRepository.deleteById(id);
    }
    @Override
    public List<Task> getTasksByAssignee(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
        return taskRepository.findByAssignee(user);
    }
}
