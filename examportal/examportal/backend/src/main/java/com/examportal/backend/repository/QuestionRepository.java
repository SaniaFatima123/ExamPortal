package com.examportal.backend.repository;

import com.examportal.backend.models.exam.Question;
import com.examportal.backend.models.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Set<Question> findByQuiz(Quiz quiz);
}
