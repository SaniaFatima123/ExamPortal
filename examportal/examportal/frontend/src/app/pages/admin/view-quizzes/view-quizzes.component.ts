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
  pageNumber: number = 0;

  ngOnInit(): void {
   this.getAllQuizzes(this.pageNumber, "")
  }

  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.quizzes = [];
    this.getAllQuizzes(this.pageNumber,searchkeyword);
  }

  //get all quiz
  getAllQuizzes(pageNumber, searchKey: string = ""){
    this.quizService.quizzes(pageNumber, searchKey).subscribe(
      (data:any)=>{
        this.quizzes = data;
        console.log(this.quizzes); 
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
      this.getAllQuizzes(this.pageNumber, "")
      },
      (error)=>{
        this.snack.open('Some Error Occurred While Deleting','',{
          duration: 3000
        })
      }
     )
  }
  onClickNext(){
    this.pageNumber = this.pageNumber + 1;
    console.log(this.pageNumber)
    this.getAllQuizzes(this.pageNumber)
  }
  onClickPrev(){
    this.pageNumber = this.pageNumber - 1;
    console.log(this.pageNumber)
    this.getAllQuizzes(this.pageNumber)
  }
}
