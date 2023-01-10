import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { Workday } from 'src/app/shared/models/workday';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { Router, ActivatedRoute } from '@angular/router'; // On importe ActivatedRoute en plus.

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: [
  ]
})
export class WorkdayFormComponent {
  
  workdayId!: string;
  workdayForm!: FormGroup;
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private workdaysService: WorkdaysService,
    private authService: AuthService,
    private route: ActivatedRoute) { }
  
  ngOnInit() {
    
    this.workdayId = '';
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
  
  

 resetWorkdayForm() {
  while(this.tasks.length !== 0) {
   this.tasks.removeAt(0);
  }
  this.notes.reset();
 }

 onDateSelected(displayDate: string) {
  const user: User|null = this.authService.currentUser;
     
  if(user && user.id) {
   this.workdaysService.getWorkdayByDate(displayDate, user.id).subscribe(workday => {
    this.resetWorkdayForm();      
    if(!workday) return;
              
    this.notes.setValue(workday.notes);
    workday.tasks.forEach(task => {
     const taskField: FormGroup = this.fb.group({
      title: task.title,
      todo: task.todo,
      done: task.done
     });
     this.tasks.push(taskField);
    });
   });
  }
 }

 submit(): void {
  const user: User|null = this.authService.currentUser;
 
  if(!(user && user.id)) {
   return;
  }
 
  // Update workday
  if(this.workdayId) {
   const workdayToUpdate: Workday = new Workday({ ...this.workdayForm.value, userId: user.id, id: this.workdayId });
     
   this.workdaysService.update(workdayToUpdate).subscribe({
    next: () => this.router.navigate(['/app/planning']),
    error: () => this.workdayForm.reset()
   });
   return;
  }
 
  // Create workday
  const workdayToCreate = new Workday({ ...this.workdayForm.value, userId: user.id });
  this.workdaysService.save(workdayToCreate).subscribe({
   next: () => this.router.navigate(['/app/planning']),
   error: () => this.workdayForm.reset()
  });
 }
}