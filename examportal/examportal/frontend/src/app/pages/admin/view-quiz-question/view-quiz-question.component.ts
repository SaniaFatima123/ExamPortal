import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit{

  constructor(private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar) { }
  
  qId;
  qTitle;
  questions:any = [];

  ngOnInit(): void {
    this.qId = this.route.snapshot.params.qid;
    this.qTitle = this.route.snapshot.params.title;
    this.getAllQuestion(this.qId)
    }
    getAllQuestion(qId){
      this.questionService.getQuestionsOfQuiz(this.qId).subscribe(
        (data)=>{
          console.log(data)
          this.questions = data
        },
        (error)=>{
          console.log("some error occurred while loading question")
        }
      )
    }
   
  deleteQuestion(quesId){
   this.questionService.deleteQuestion(quesId).subscribe(
    (data)=>{
      this.snack.open('Question Deleted','',{
        duration: 3000
      })
      this.getAllQuestion(this.qId)
    },
    (error)=>{
      this.snack.open('Some Error Occurred While Deleting','',{
        duration: 3000
      })
    }
   )
  }
  


}


