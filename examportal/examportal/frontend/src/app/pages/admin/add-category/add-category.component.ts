import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  constructor(private categoryService: CategoryService, private snack: MatSnackBar){}

category = {
  title:'',
  description:''
}

formSubmit(){
  if(this.category.title.trim()==''|| this.category.title==null){
this.snack.open("Title Required !!",'',{
  duration: 3000
})
return
}
this.categoryService.addNewCategory(this.category).subscribe(
  (data)=>{
    this.category.title=''
    this.category.description=''
    this.snack.open("Category is added successfully !!",'',{
      duration: 3000
    })
  },
  (error)=>{
    console.log(error)
    this.snack.open("Some error occured while adding Category !!",'',{
      duration: 3000
    })
  }

)
}
}
