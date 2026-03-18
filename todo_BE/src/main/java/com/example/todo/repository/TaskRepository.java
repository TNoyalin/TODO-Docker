package com.example.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.todo.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query(value = """
                SELECT * FROM (
                    SELECT * FROM TASK
                    WHERE STATUS = 'INI'
                    ORDER BY CREATED_AT DESC
                ) WHERE ROWNUM <= 5
            """, nativeQuery = true)
    List<Task> getLatestTasks();
}
