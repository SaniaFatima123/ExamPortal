import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  //get all quizzes
  public quizzes(pageNumber) {
    console.log("inside quiz service*****")
    return this._http.get(`${baseUrl}/quiz/getQuizzes?pageNumber=`+pageNumber);
  }

  //add a quiz
  public addQuiz(quiz) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }
  //delete a quiz
  public deleteQuiz(qId) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`)
  }
  //get a single quiz
  public getQuiz(qId) {
    return this._http.get(`${baseUrl}/quiz/${qId}`)
  }
  //update quiz
  public updateQuiz(quiz){
    return this._http.put(`${baseUrl}/quiz/`,quiz)
  }
  //get quizzes of category
  public getQuizzesOfCategory(cid){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }
}
