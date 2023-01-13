import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardPomodoroProgressComponent } from './dashboard-pomodoro-progress/dashboard-pomodoro-progress.component';
import { DashboardTaskItemComponent } from './dashboard-task-item/dashboard-task-item.component';
import { DashboardWorkdayComponent } from './dashboard-workday/dashboard-workday.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardPomodoroProgressComponent,
    DashboardTaskItemComponent,
    DashboardWorkdayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
