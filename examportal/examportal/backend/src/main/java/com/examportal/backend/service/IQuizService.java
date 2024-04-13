package com.examportal.backend.service;

import com.examportal.backend.models.exam.Category;
import com.examportal.backend.models.exam.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface IQuizService {
    Quiz addQuiz(Quiz quiz);
    Quiz updateQuiz(Quiz quiz);
    Quiz getQuiz(Long quizId);
    void deleteQuiz(Long quizId);
    Set<Quiz> getQuizzes(int pageNumber);

    List<Quiz> getQuizzesOfCategory(Category category,int pageNumber);

}
