import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user = null;
  currentDateTime;
  greet;
  constructor(private login: LoginService, private datepipe: DatePipe,private httpClient: HttpClient){} 


  ngOnInit(): void {
    //here im getting data from localStorage
    this.user = this.login.getUser();

     // Get the current date
     const currentDate = new Date();
    
     // Format the date as 'MM/dd/yyyy H:mm'
     this.currentDateTime = this.datepipe.transform(currentDate, 'MM/dd/yyyy H:mm');
     
     // Extract the hour from the current date
     const currentHour = currentDate.getHours();
 
     // Set the greeting based on the hour
     if (currentHour >= 0 && currentHour < 12) {
       this.greet = 'Good morning!!';
     } else if (currentHour >= 12 && currentHour < 16) {
       this.greet = 'Good afternoon!!';
     } else if (currentHour >= 16 && currentHour < 20) {
       this.greet = 'Good evening!!';
     } else {
       this.greet = 'Good evening!!';
     }
}
}
