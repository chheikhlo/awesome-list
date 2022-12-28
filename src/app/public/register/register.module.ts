import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegisterComponent,
    RegisterFormComponent
  ],
  imports: [
    SharedModule
  ]
})
export class RegisterModule { }
