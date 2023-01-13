import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'al-workday-form-task-add',
  templateUrl: './workday-form-task-add.component.html',
  styles: [
  ]
})
export class WorkdayFormTaskAddComponent {

  @Output() addedTask = new EventEmitter<void>();
  

  addTask() {
    this.addedTask.emit();
  }
}
