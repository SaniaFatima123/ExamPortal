import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{

  constructor(private categoryService: CategoryService){}

  categories=[]
  
  ngOnInit(): void {
    this.categoryService.categories().subscribe((data:any)=>{
      console.log("**********************inside admin view-category")
      this.categories = data;
      // console.log(this.categories);
    },
    (error)=>{
      console.log("some error occure while loading all the categories");
    })
  }


}
