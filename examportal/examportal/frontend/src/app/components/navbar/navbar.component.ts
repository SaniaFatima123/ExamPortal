import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn: any=false;
  user=null;

constructor(private loginService: LoginService, private router: Router){}

  ngOnInit(): void {
   this.isLoggedIn = this.loginService.isLoggedIn();
   this.user = this.loginService.getUser();
   this.loginService.loginStatusSubject.asObservable().subscribe((data) => {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.loginService.isLoginStatusSubject.subscribe(dataStatus => {
      this.isLoggedIn = dataStatus;
      this.loginService.logout();
      this.user = null;
      this.router.navigate(['/login']);
    })
   })
  }
 
public logout(){
this.loginService.logout();
this.isLoggedIn = false;
this.user = null;
this.router.navigate(['/login']);
}

//if user is admin then change route to admin profile or else change it to user profile
navigateTo(){
  if(this.loginService.getUserRole()=="ADMIN"){
    this.router.navigate(['admin/profile'])
  }
  else if(this.loginService.getUserRole()=="NORMAL"){
    console.log("NORMAL role");
    this.router.navigate(['user-dashboard/user-profile'])
  }
  else{
    console.log("LOGGING out");
  }   
}
}
