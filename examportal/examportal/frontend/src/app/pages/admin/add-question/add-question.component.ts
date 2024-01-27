import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar) { }
  qId;
  qTitle;
  question = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  }

  ngOnInit(): void {
    this.route.params.subscribe((data)=>{
      this.qId = data.qid
    this.qTitle = data.title;
    this.question.quiz['qId'] = this.qId;

    })
  }
  //add question on submitting the form
  addQuestion() {
    //validation
    if (this.question.content.trim() == '' || this.question.content == null) {
      return
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return
    }

    //submit form
    this.question.content=this.question.content.slice(3)
    this.question.content = this.question.content.slice(0,-5)
    this.questionService.addQuestion(this.question).subscribe(
      (data) => {
        this.snack.open('Question Added Successfully', '', {
          duration: 3000
        })
        this.question.content = '',
        this.question.option1 = '',
        this.question.option2 = '',
        this.question.option3 = '',
        this.question.option4 = '',
        this.question.answer = ''
        
      },
      (error) => {
        console.log(error)
        this.snack.open('error while adding', '', {
          duration: 3000
        })
      }
    )

  }
}