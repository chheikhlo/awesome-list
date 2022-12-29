import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      'title': ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150)
       ]],
       'todo': [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
       ]],
       'done': 0
    }))
  }

  onRemovedTask(index: number) {
    this.task.removeAt(index);
  }
  
}
