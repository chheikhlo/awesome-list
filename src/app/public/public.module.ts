import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeModule } from './home/home.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { RegisterRoutingModule } from './register/register-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HomeModule,
    LoginRoutingModule,
    RegisterRoutingModule
  ]
})
export class PublicModule { }
