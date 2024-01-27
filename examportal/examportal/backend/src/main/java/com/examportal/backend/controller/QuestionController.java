package com.examportal.backend.controller;

import com.examportal.backend.models.exam.Question;
import com.examportal.backend.models.exam.Quiz;
import com.examportal.backend.service.IQuestionService;
import com.examportal.backend.service.IQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {
    @Autowired
    private IQuestionService questionService;
    @Autowired
    private IQuizService quizService;

    @PostMapping("/")
    public Question addQuestion(@RequestBody Question question){
        return (questionService.addQuestion(question));
    }
    @GetMapping("/{questionId}")
    public Question getQuestion(@PathVariable Long questionId){
        return questionService.getQuestion(questionId);
    }

    @PutMapping("/")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(questionService.updateQuestion(question));
    }
    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable Long questionId){
        questionService.deleteQuestion(questionId);
    }

    @GetMapping("/")
    public ResponseEntity<?> getQuestions(){
        return ResponseEntity.ok(questionService.getQuestions());
    }
    //get all questions of any quiz
    @GetMapping("/quiz/{quizId}")
    public List<Question> getQuestionsOfQuiz(@PathVariable("quizId") Long quizId){

        Quiz quiz = quizService.getQuiz(quizId);
        Set<Question> questions = quiz.getQuestions();
        List<Question> list = new ArrayList(questions);
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }
        list.forEach(question->{
            question.setAnswer("");
        });
        Collections.shuffle(list);
        return list;
    }

    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid){
        Quiz quiz = new Quiz();
        quiz.setqId(qid);
        Set<Question> questionsOfQuiz = questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }

    //evaluate quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
        double marksGot = 0;
        int correctAnswers = 0;
        int attempted = 0;
        for (Question q :questions) {
            //single questions
            Question question = this.questionService.get(q.getQuesId());

            if (question.getAnswer().equals(q.getGivenAnswer())) {
                //correct
                correctAnswers++;
                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/(questions.size());
            marksGot +=marksSingle;
            }

            //for negative marking
            if(!question.getAnswer().equals(q.getGivenAnswer()) && q.getGivenAnswer()!=null && !q.getGivenAnswer().isEmpty()){
                marksGot--;
            }
            if (q.getGivenAnswer()!=null && !q.getGivenAnswer().isEmpty()) {
                attempted++;
            }

        }
//        Map<String, Object> map = Map.of("marksGot",marksGot,"correctAnswers",correctAnswers,"attempted",attempted);
        Map<String,Object> map=new HashMap<>();
        map.put("marksGot",marksGot);
        map.put("correctAnswers",correctAnswers);
        map.put("attempted",attempted);
        return ResponseEntity.ok(map);
    }
}
