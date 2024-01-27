import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private router: Router){

  }
  ngOnInit(): void {
  let token = localStorage.getItem("token");
  if(token == null || token == undefined || token === ""){
    this.router.navigate(['/login']);
  }
  }
  title = 'examportal';
}
