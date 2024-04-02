package com.examportal.backend.service.impl;

import com.examportal.backend.models.exam.Category;
import com.examportal.backend.models.exam.Quiz;
import com.examportal.backend.repository.QuizRepository;
import com.examportal.backend.service.IQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Service
public class QuizServiceImpl implements IQuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Quiz getQuiz(Long quizId) {
        return quizRepository.findById(quizId).get();
    }

    @Override
    public void deleteQuiz(Long quizId) {
        quizRepository.deleteById(quizId);
    }

    @Override
    public Set<Quiz> getQuizzes(int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, 6);
//        return new HashSet<>(quizRepository.findAll(pageable));
        List<Quiz> quizList = quizRepository.findAll(pageable).getContent();
        return new HashSet<>(quizList);
    }

    @Override
    public List<Quiz> getQuizzesOfCategory(Category category) {
        return quizRepository.findByCategory(category);
    }
}
