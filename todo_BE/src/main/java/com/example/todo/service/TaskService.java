package com.example.todo.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todo.entity.Task;
import com.example.todo.repository.TaskRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TaskService {

    @Autowired
    private TaskRepository repo;

    // Load pending 5 tasks
    public List<Task> getTasks() {
        return repo.getLatestTasks();
    }

    // Create new task
    public Task save(Task task) {
        task.setStatus("INI");
        task.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        return repo.save(task);
    }

    public void markDone(Long id) {
        Task t = repo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Task not found: " + id));
        t.setStatus("DONE");
        repo.save(t);
    }
}
