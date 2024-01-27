import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if(this.loginService.isLoggedIn() && this.loginService.getUserRole() =='NORMAL'){
        console.log("checked canActivate condition"); 
        return true;
        console.log("After checked canActivate condition");
      }
      this.router.navigate([''])
      console.log("khvvkhv");
      return false;
    }
  }
