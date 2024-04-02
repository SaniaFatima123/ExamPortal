import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{

  constructor(private quizService: QuizService,
    private snack: MatSnackBar){}

  quizzes=[];

  ngOnInit(): void {
   this.getAllQuizzes()
  }
  //get all quiz
  getAllQuizzes(){
    this.quizService.quizzes(0).subscribe(
      (data:any)=>{
        this.quizzes = data;
        // console.log(this.quizzes); 
      },
      (error)=>{
        console.log("some error occured while loading quizzes"+ error)
      }
    )
  }
  //delete a Quiz
  deleteQuiz(qId){
     this.quizService.deleteQuiz(qId).subscribe(
      (data)=>{
      this.snack.open('successfully deleted','',{
        duration: 3000
      })
      this.getAllQuizzes()
      },
      (error)=>{
        this.snack.open('Some Error Occurred While Deleting','',{
          duration: 3000
        })
      }
     )
  }
 

}
