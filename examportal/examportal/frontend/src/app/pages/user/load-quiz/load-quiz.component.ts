import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { createFind } from 'rxjs/internal/operators/find';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId;
  quizzes;
  pageNumber: number = 0;
  constructor(private route: ActivatedRoute, private quizService: QuizService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllQuizzes(this.pageNumber)

  }

  getAllQuizzes(pageNumber){
    this.route.params.subscribe((params) => {
      this.catId = params.catId;
      if (this.catId == 0) {
        console.log("Load all quizzes**************")
        this.quizService.quizzes(pageNumber).subscribe(
          (data) => {
            this.quizzes = data
          },
          (error) => {
            this.snack.open('Some error occurred while loading quizzes')
          }
        )
      }
      else {
        console.log("Load specific quiz")
        //load specific quizzes of category
        this.quizService.getQuizzesOfCategory(this.catId).subscribe(
          (data)=>{
            this.quizzes = data;
          },
          (error)=>{
            this.snack.open('Some error occurred while loading quizzes','',{
              duration: 3000
            })
          }
        )
      }
    })
  }


  onClickNext(){
    this.pageNumber = this.pageNumber + 1;
    this.getAllQuizzes(this.pageNumber)
  }
  onClickPrev(){
    this.pageNumber = this.pageNumber - 1;
    this.getAllQuizzes(this.pageNumber)
  }
}
