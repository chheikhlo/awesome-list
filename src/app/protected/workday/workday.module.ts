import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkdayComponent } from './workday/workday.component';
import { WorkdayFormComponent } from './workday-form/workday-form.component';
import { WorkdayFormDateComponent } from './workday-form-date/workday-form-date.component';
import { WorkdayFormTaskComponent } from './workday-form-task/workday-form-task.component';
import { WorkdayFormTaskItemComponent } from './workday-form-task-item/workday-form-task-item.component';
import { WorkdayFormNotesComponent } from './workday-form-notes/workday-form-notes.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { WorkdayFormTaskAddComponent } from './workday-form-task-add/workday-form-task-add.component';
 
defineLocale('fr', frLocale);

@NgModule({
  declarations: [
    WorkdayComponent,
    WorkdayFormComponent,
    WorkdayFormDateComponent,
    WorkdayFormTaskComponent,
    WorkdayFormTaskItemComponent,
    WorkdayFormNotesComponent,
    WorkdayFormTaskAddComponent
  ],
  imports: [
    SharedModule
  ]
})
export class WorkdayModule { }
