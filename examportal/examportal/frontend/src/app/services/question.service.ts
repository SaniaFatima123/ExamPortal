import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }
  
  //get questions
  public getQuestionsOfQuiz(qid){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }
   //get questions
   public getQuestionsOfQuizTest(qid){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`)
  }
  //add question
  public addQuestion(question){
   return this._http.post(`${baseUrl}/question/`, question)
  }
  //delete question
  public deleteQuestion(questionId){
  return this._http.delete(`${baseUrl}/question/${questionId}`)
  }
  //eval quiz
  public evalQuiz(questions){
  return this._http.post(`${baseUrl}/question/eval-quiz`,questions) 
  }
  //update question
  public updateQuestion(question){
    return this._http.put(`${baseUrl}/question/`, question)
  }
  //get question with question id
  public getQuestion(questionId){
    return this._http.get(`${baseUrl}/question/${questionId}`)
  }
}
