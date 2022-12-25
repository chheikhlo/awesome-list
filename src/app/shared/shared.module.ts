import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModule } from './modules/ngx-bootstrap.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';



@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    NgxBootstrapModule
  ],
  exports: [
    CommonModule,
    //réexporter notre module NgxBootstrapModule pour le reste de notre application
    NgxBootstrapModule,
    SidenavComponent
  ]
})
export class SharedModule { }
