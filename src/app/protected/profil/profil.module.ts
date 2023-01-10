import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './profil/profil.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfilComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProfilModule { }
