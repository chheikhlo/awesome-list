import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Ajouter ces importations :
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
  declarations: [
  ],
  imports: [
   CommonModule,
   AlertModule.forRoot(),
   BsDatepickerModule.forRoot(),
   BsDropdownModule.forRoot(),
   ModalModule.forRoot(),
   PopoverModule.forRoot(),
   ProgressbarModule.forRoot()
 ],
 // Compléter également le tableau des exportations :
 exports: [
  AlertModule,
  BsDatepickerModule,
  BsDropdownModule,
  ModalModule,
  PopoverModule,
  ProgressbarModule
 ]
})
export class NgxBootstrapModule { }