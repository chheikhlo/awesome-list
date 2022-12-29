import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: [
  ]
})
export class WorkdayFormComponent {
 
  workdayForm!: FormGroup;
  
  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
   this.workdayForm = this.fb.group({
    dueDate: ['', [
      Validators.required
     ]],
     tasks: this.fb.array([], [
      Validators.required,
      Validators.maxLength(6)
     ]),
     notes: ['', [
      Validators.maxLength(1000)
     ]]
    });
  }
  
  get dueDate() { return this.workdayForm.get('dueDate') as FormControl; }
  get notes() { return this.workdayForm.get('notes') as FormControl; }
  get tasks() { return this.workdayForm.get('tasks') as FormArray; }
  
  
  submit(): void {
   console.info(this.workdayForm.value);
  }
}