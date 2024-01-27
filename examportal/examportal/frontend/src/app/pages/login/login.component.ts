import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private snack:MatSnackBar, private loginService: LoginService, private router: Router){}

loginData={
  username:'',
  password:''
};
formSubmit(){
  console.log("Login")
  //validation for username
  if(this.loginData.username.trim()=='' || this.loginData.username==null){
this.snack.open('Username is required !!', '', {duration: 3000});
return;
  }
  //validation for password
  if(this.loginData.password.trim()=='' || this.loginData.password==null){
    this.snack.open('Password is required !!', '', {duration: 3000});
    return;
      }

      //request to server to generate token
this.loginService.generateToken(this.loginData).subscribe((data:any)=>{
  console.log("success");
  console.log(data);
  //login...
  this.loginService.loginUser(data.token);

  this.loginService.getCurrentUser().subscribe((user:any) => {
    this.loginService.setUser(user);
    console.log(user);
    //redirect...ADMIN: admin-dashboard
    //redirect...NORMAL: normal-dashboard
    if(this.loginService.getUserRole()=="ADMIN"){
      //admin dashboard
      // window.location.href='/admin';
      this.router.navigate(['admin/categories'])
      this.loginService.loginStatusSubject.next(true)
    }
    else if(this.loginService.getUserRole()=="NORMAL"){
      console.log("NORMAL role");
      //normal user-dashboard
      // window.location.href='/user-dashboard';
      this.router.navigate(['user-dashboard/user-profile'])
      this.loginService.loginStatusSubject.next(true)
    }
    else{
      console.log("LOGGING out");
      
      this.loginService.logout();
    }   
  });
},
  (error) => {
    console.log("Something went wrong");
    console.log(error);
    this.snack.open("Invalid Details !! Try again !!","", {duration: 3000})
  });
    
}

}
