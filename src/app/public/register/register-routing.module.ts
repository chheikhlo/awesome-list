import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { Routes } from '@angular/router';
  
const routes: Routes = [
 { path: '', component: RegisterComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RegisterRoutingModule { }
