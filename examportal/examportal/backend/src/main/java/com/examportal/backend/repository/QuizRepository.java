package com.examportal.backend.repository;

import com.examportal.backend.models.exam.Category;
import com.examportal.backend.models.exam.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    public List<Quiz> findByCategory(Category category);

    public Page<Quiz> findAll(Pageable pageable);
}
