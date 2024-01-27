import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';

const routes: Routes = [
  {path:"", component: HomeComponent, pathMatch:"full"},
{path:"register", component: RegisterComponent, pathMatch:"full"},
{path:"login", component: LoginComponent, pathMatch:"full"},
{path:"admin", component: DashboardComponent, canActivate:[AdminGuard],
children:[
  {path: '', component: WelcomeComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'categories', component: ViewCategoriesComponent},
  { path: 'add-category', component: AddCategoryComponent},
  { path: 'quizzes', component: ViewQuizzesComponent},
  { path: 'add-quiz', component: AddQuizComponent},
  { path: 'quiz/:qid', component: UpdateQuizComponent},
  { path: 'view-questions/:qid/:title', component: ViewQuizQuestionComponent},
  { path: 'add-question/:qid/:title', component: AddQuestionComponent},
  { path: 'question/:questionid', component: UpdateQuestionComponent},
  { path: 'logout', component: LoginComponent},
]},
{path:"user-dashboard", component: UserDashboardComponent, canActivate: [NormalGuard],
children:[
  { path: 'user-profile', component: UserProfileComponent},
  {path: ':catId', component: LoadQuizComponent},
  {path: 'instructions/:qid', component: InstructionsComponent},
]
},
{path: 'start/:qid', component: StartComponent, canActivate: [NormalGuard]},

]

@NgModule({
  imports: [RouterModule.forRoot(routes),
  MatSnackBarModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
