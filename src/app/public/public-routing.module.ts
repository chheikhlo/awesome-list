import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Ajouter cette importation
import { HomeComponent } from './home/home/home.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './register/register-form/register-form.component';

 
const routes: Routes = [
 { 
  path: 'home', component: HomeComponent 
 },
 {
  path: 'login', component: LoginFormComponent
 },
 {
  path: 'register', component: RegisterFormComponent
 }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
