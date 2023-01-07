import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersComponent } from './parameters/parameters.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ParametersComponent,
    
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ParametersModule { }
