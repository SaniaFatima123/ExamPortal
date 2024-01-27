import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private categoryService: CategoryService,
     private snack: MatSnackBar,
     private quizService: QuizService) { }

  categories = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data: any) => {
        console.log(data);
        this.categories = data
      },
      (error) => {
        console.log("some error occured while loading categories!!" + error)
      }
    )
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.snack.open("Title is required !!", '', {
        duration: 3000
      })
      return;
    }
    //validations.......
    //if valid then add the quiz
    this.quizService.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        this.snack.open("Quiz added Successfully",'',{
          duration: 3000
        })
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: '',
          },
        },
        (error)=>{console.log("Some error occured while adding quiz")}
      }
    )
  }
}
