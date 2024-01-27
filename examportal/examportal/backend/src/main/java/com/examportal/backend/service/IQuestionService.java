package com.examportal.backend.service;

import com.examportal.backend.models.exam.Question;
import com.examportal.backend.models.exam.Quiz;

import java.util.Set;

public interface IQuestionService {
    Question addQuestion(Question question);
    Question updateQuestion(Question question);
    Question getQuestion(Long questionId);
    void deleteQuestion(Long questionId);
    Set<Question> getQuestions();
    Set<Question> getQuestionsOfQuiz(Quiz quiz);
    Question get(Long questionsId);
}
