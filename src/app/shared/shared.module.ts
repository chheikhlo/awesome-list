import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModule } from './modules/ngx-bootstrap.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    NgxBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    //réexporter notre module NgxBootstrapModule pour le reste de notre application
    NgxBootstrapModule,
    SidenavComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
