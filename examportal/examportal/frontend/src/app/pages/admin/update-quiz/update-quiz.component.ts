import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private quizService: QuizService,
    private route: ActivatedRoute,
    private categoriesService: CategoryService,
    private snack: MatSnackBar,
    private router: Router) { }

  qId = 0;
  quiz;
  categories;

  ngOnInit(): void {
    this.qId=this.route.snapshot.params.qid;
    this.quizService.getQuiz(this.qId).subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        console.log(error)
      }
    )
    this.categoriesService.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error)
      }
    )
  }
  //update quiz on submitting
  public updateQuiz(){
    //validate before updating....
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data)=>{
        this.router.navigate(['admin/quizzes'])
        this.snack.open('Successfully Updated Quiz','',{
          duration: 3000
        })
      },
      (error)=>{
        // console.log(error)
        this.snack.open('Some Error Occurred','',{
          duration: 3000
        })
      }
    )
      
    }

}
