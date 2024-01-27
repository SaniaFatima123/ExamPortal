import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import baseUrl from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = null;
  currentDateTime;
  greet;
  constructor(private login: LoginService, private datepipe: DatePipe,private httpClient: HttpClient){} 

  ngOnInit(): void {
    //here im getting data from localStorage
    this.user = this.login.getUser();
    // this.currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy H:mm');
    // if(this.currentDateTime>=0 && this.currentDateTime<12){
    //    this.greet = "Good morning!!"
    // }
    // else if(this.currentDateTime>=12 && this.currentDateTime<16){
    //   this.greet = "Good afternoon!!"
    // }
    // else if(this.currentDateTime>=16 && this.currentDateTime<20){
    //   this.greet = "Good evenining!!"
    // }
    // else{
    //   this.greet = "Good evenining!!"
    // }

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

    //here im getting data from server
      //  this.login.getCurrentUser().subscribe(
      //   (data:any)=>{
      //     this.user=data
      //   },
      //   (error)=>{
      //      alert('error')
      //     })

  }

  // //upload profile picture

  // selectedFile: File;
  // retrievedImage: any;
  // base64Data: any;
  // retrieveResonse: any;
  // message: string;
  // imageName: any;

  // //Gets called when the user selects an image
  // public onFileChanged(event) {
  //   //Select File
  //   this.selectedFile = event.target.files[0];
  // }
  // //Gets called when the user clicks on submit to upload the image
  // onUpload() {
    // console.log(this.selectedFile);
    
    // //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    // const uploadImageData = new FormData();
    // uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    // //Make a call to the Spring Boot Application to save the image
    // this.httpClient.post(`${baseUrl}/user/upload`, uploadImageData)
    //   .subscribe((data) => {
    //       console.log("posted")
    //       console.log(data)
      //  },(error)=>{
      //   console.log("not posted")
      //   console.log(error)
      //  }
      //   );
    // }
    //  //Gets called when the user clicks on retieve image button to get the image from back end
    //  getImage(id) {
    //   //Make a call to Sprinf Boot to get the Image Bytes.
    //   this.httpClient.get(`${baseUrl}/user/get/${id}`)
    //     .subscribe(
    //       res => {
    //         this.retrieveResonse = res;
    //         this.base64Data = this.retrieveResonse.picByte;
    //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    //       }
    //     );
    // }
  }


