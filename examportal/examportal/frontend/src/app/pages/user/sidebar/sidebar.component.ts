import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService: LoginService, private categoryService: CategoryService, private snack: MatSnackBar){}

  categories;

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data)=>{
        this.categories = data;
      },
      (error)=>{
        this.snack.open('Some error occurred while loading categories','',{
          duration: 3000
        })
      }
    )
  }
  public logout() {
    this.loginService.isLoginStatusSubject.next(false)

  }

}
