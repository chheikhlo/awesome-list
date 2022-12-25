import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModule } from './modules/ngx-bootstrap.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxBootstrapModule
  ],
  exports: [
    CommonModule,
    //réexporter notre module NgxBootstrapModule pour le reste de notre application
    NgxBootstrapModule
  ]
})
export class SharedModule { }
