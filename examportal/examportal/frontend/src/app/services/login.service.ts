import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
providedIn:  'root'
})
export class LoginService {


    public loginStatusSubject = new Subject<boolean>();
    public isLoginStatusSubject = new Subject<boolean>();

    constructor(private http: HttpClient){}

    public getCurrentUser(){
       return this.http.get(`${baseUrl}/current-user`);
    }

    public generateToken(loginData:any){
       return this.http.post(`${baseUrl}/generate-token`,loginData);
    }
    public loginUser(token){
        localStorage.setItem("token",token);
        return true;
    }

    //isLoggedIn: user is logged in or not
    public isLoggedIn(){
        let tokenStr = localStorage.getItem("token");
        if(tokenStr==null || tokenStr=='' || tokenStr==undefined){
            return false;
        }
        else{
        return true;
        }
    }
    //logout: removes token from the localStorage
    public logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return true;
    }
    //get token
    public getToken(){
        return localStorage.getItem("token");
    }
    //set userDetails
    public setUser(user){
        localStorage.setItem('user', JSON.stringify(user));
    }
    //get user
    public getUser(){
        let userStr = localStorage.getItem("user");
        if(userStr!=null){
            return JSON.parse(userStr);
        }
        else{
            this.logout();
            return null;
        }
    }
    //get role
    public getUserRole(){
        let user = this.getUser();
        console.log("getting user");
        
        
        return user.authorities[0].authority;
    }

}