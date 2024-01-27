import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{
  constructor(private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar,
    private router: Router,
    private quizService: QuizService) { }
  questId = 0;
  question;
  quizId;
  quiz;
  quizTitle;

  ngOnInit(): void {
    this.questId=this.route.snapshot.params.questionid;
    this.quizTitle = this.route.snapshot.params.title;
    this.questionService.getQuestion(this.questId).subscribe(
      (data)=>{
        this.question = data
        this.quizId = this.question.quiz.qId
      },
      (error)=>{
        this.snack.open("Some Error Occurred","",{duration: 3000})
      }
      )
      this.quizService.getQuiz(this.questId).subscribe(
        (data)=>{
        this.quiz = data
        },
         (error)=>{
          console.log(error)
         }
      )

  }

  updateQuestion(){
    this.question.content=this.question.content.slice(3)
    this.question.content = this.question.content.slice(0,-5)
    this.questionService.updateQuestion(this.question).subscribe(
      (data)=>{
        this.snack.open("Question Updated Successfully","",{duration: 3000})
        // this.router.navigate(['admin/quizzes'])
      },(error)=>{
        this.snack.open("Some error occurred while updating question","",{duration: 3000})
      }
    )
  }
}

