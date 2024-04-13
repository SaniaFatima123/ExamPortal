package com.examportal.backend.controller;

import com.examportal.backend.models.exam.Category;
import com.examportal.backend.models.exam.Quiz;
import com.examportal.backend.service.IQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
    @Autowired
    private IQuizService quizService;

    @PostMapping("/")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(quizService.addQuiz(quiz));
    }
    @GetMapping("/{qId}")
    public Quiz getQuiz(@PathVariable Long qId){
        return quizService.getQuiz(qId);
    }

    @PutMapping("/")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(quizService.updateQuiz(quiz));
    }

    @DeleteMapping("/{qId}")
    public void deleteQuiz(@PathVariable Long qId){
        quizService.deleteQuiz(qId);
    }

    @GetMapping("/getQuizzes")
    public ResponseEntity<?> getQuizzes(@RequestParam(defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(quizService.getQuizzes(pageNumber));
    }

    @GetMapping("/category/{cid}/{pageNumber}")
    public List<Quiz> getQuizzesOfCategory(@PathVariable("cid") Long cid, @PathVariable("pageNumber") int pageNumber){
        Category category = new Category();
        category.setCid(cid);
        return quizService.getQuizzesOfCategory(category, pageNumber);
    }


}
