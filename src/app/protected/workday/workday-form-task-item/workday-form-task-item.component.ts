import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'al-workday-form-task-item',
  templateUrl: './workday-form-task-item.component.html',
  styles: [
  ]
})
export class WorkdayFormTaskItemComponent {

  @Input() task!: FormGroup;

}
