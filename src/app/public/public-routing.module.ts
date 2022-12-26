import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Ajouter cette importation
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
 
const routes: Routes = [
 { path: 'home', component: HomeComponent },
 {
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
 },
 { path: 'register', 
   loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) 
 }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
