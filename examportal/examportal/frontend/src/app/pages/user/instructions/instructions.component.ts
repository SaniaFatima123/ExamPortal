import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private quizService: QuizService,
    private snack: MatSnackBar,
    private router: Router) { }
  qid;
  quiz
  ngOnInit(): void {
    this.qid = this.route.snapshot.params.qid;
    this.quizService.getQuiz(this.qid).subscribe(
      (data) => {
        this.quiz = data
        console.log(this.quiz)
      },
      (error) => {
        this.snack.open('Some error occurred while loading quiz', '', {
          duration: 3000
        })
      }
    )
  }
  StartQuiz(){
    Swal.fire({
      title: 'Do you want to start the Quiz?',
     
      showCancelButton: true,
      confirmButtonText: 'Start Test',
    }).then((result) => {
      if (result.isConfirmed) {
       this.router.navigate(['/start/'+this.qid])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
