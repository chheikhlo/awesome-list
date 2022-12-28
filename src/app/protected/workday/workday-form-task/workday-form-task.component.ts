import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'al-workday-form-task',
  templateUrl: './workday-form-task.component.html',
  styles: [
  ]
})
export class WorkdayFormTaskComponent {

  @Input()
  workdayForm!: FormGroup;

  @Input()
  task!: FormArray;

  taskControlList!: FormGroup[];

  constructor(private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.taskControlList = this.task.controls as FormGroup[];
  }

  onAddedTask(){
    this.task.push(this.fb.group({
      'title': ''
    }))
  }
}
