import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid;
  questions=[];

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any

  constructor(private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.route.snapshot.params.qid;
    this.loadQuestions();
  }
  loadQuestions(){
    this.questionService.getQuestionsOfQuizTest(this.qid).subscribe(
      (data: any) => {
        console.log(data )
        this.questions = data;
        this.timer = this.questions.length * 1 * 60;
        this.questions.forEach((q) => {
          q['givenAnswer'] = '';
        });
        console.log(this.questions);
        this.startTimer();
      },
      (error) => { 
        this.snack.open('Some error ocuurred while loading quiz','',{
          duration: 3000
        })
      })
  }
  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href)
    });
  }
  submitQuiz(){
    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        //calculate
       this.evalQuiz();
      //  this.router.navigate(['/start/'+this.qid])
      // } else if (result.isDenied) {
      //   Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
    //code  
    if(this.timer <= 0){
    this.evalQuiz();
    clearInterval(t);
    }
    else{
    this.timer--;
    }
    }, 1000);
}

getFormattedTime(){
  let mm = Math.floor(this.timer / 60);
  let ss = this.timer - mm * 60;
  return `${mm} min : ${ss} sec`;

}
evalQuiz(){
  //calculation
  //call to server to check questions
  this.questionService.evalQuiz(this.questions).subscribe(
    (data: any)=>{
      console.log(data);
      this.marksGot =parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers = data.correctAnswers;
      this.attempted = data.attempted;
      this.isSubmit = true;
    },
    (error)=>{
      console.log(error)
    }
  )
  // this.questionService.
//   this.isSubmit = true
//   this.questions.forEach((q) => {
//     if(q.givenAnswer == q.answer){
//       this.correctAnswers++;
//       let marksSingle = 
//       this.questions[0].quiz.maxMarks / this.questions.length;
//       this.marksGot += marksSingle;
//     }
//     if (q.givenAnswer.trim() != '') {
//       this.attempted++;
//       }
//   })
//   console.log('correct answers : ' + this.correctAnswers)
//     console.log('Marks Got : ' + this.marksGot)
//     console.log('attempted : ' + this.attempted);
// }
}
printPage(){
  window.print();
}
}