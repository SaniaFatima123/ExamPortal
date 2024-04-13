import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId;
  quizzes: any = [];
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
        //load specific quizzes of category
        this.quizService.getQuizzesOfCategory(this.catId, pageNumber).subscribe(
          (data)=>{
            // console.log(data)
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
    console.log(this.pageNumber)
    this.getAllQuizzes(this.pageNumber)
  }
  onClickPrev(){
    this.pageNumber = this.pageNumber - 1;
    console.log(this.pageNumber)
    this.getAllQuizzes(this.pageNumber)
  }
}
