import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
   
  }

  public logout() {
    this.loginService.isLoginStatusSubject.next(false)

  }
}
