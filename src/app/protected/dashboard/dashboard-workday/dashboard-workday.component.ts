import { Component, Input } from '@angular/core';
import { Workday } from 'src/app/shared/models/workday';

import { interval, Observable, of, Subject } from 'rxjs';
import { delay, map, takeUntil, takeWhile } from 'rxjs/operators';

import { Task } from 'src/app/shared/models/task';
import { WorkdaysService } from 'src/app/core/services/workdays.service';

import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'al-dashboard-workday',
  templateUrl: './dashboard-workday.component.html',
  styleUrls: ['./dashboard-workday.component.scss']
})
export class DashboardWorkdayComponent {

  currentTask!: Task|undefined;
  @Input() workday!: Workday;
  isPomodoroActive!: boolean;

  startPomodoro$!: Subject<string>;
  cancelPomodoro$!: Subject<string>;
  completePomodoro$!: Subject<string>;
  currentProgress!: number;
  maxProgress!: number;
  pomodoro$!: Observable<number>;
  isWorkdayComplete!: boolean;

  constructor(private workdaysService: WorkdaysService,  private authService: AuthService){
    
  }
  ngOnInit(): void {
    this.isPomodoroActive = false;
    this.startPomodoro$ = new Subject();
    this.cancelPomodoro$ = new Subject();
    this.completePomodoro$ = new Subject();
    this.currentProgress = 0
    //this.maxProgress = 5; 
    //''''''''''''''''''''''''''''
    const user: User|null = this.authService.currentUser;
    if(user) {
     this.maxProgress = user.pomodoroDuration;
    }
    //'''''''''''''''''''''''''''''
    this.pomodoro$ = interval(1000).pipe(map(x => x + 1));
    this.isWorkdayComplete = (this.getCurrentTask() === undefined);

    
    
    this.pomodoro$ = interval(1000).pipe(
      takeUntil(this.cancelPomodoro$),
      takeUntil(this.completePomodoro$),
      takeWhile(progress => progress <= this.maxProgress),
      map(x => x + 1)
     );

     
  }
  
  getCurrentTask(): Task|undefined {
    return this.workday.tasks.find(task => task.todo > task.done)
  }
  
  startPomodoro() {
    this.isPomodoroActive = true;
    this.startPomodoro$.next('start');
 
    this.pomodoro$.subscribe(currentProgress => {
      this.currentProgress = currentProgress;
     });

     if(this.currentProgress === this.maxProgress) {
      of(0).pipe(delay(500)).subscribe(_ => this.completePomodoro())
     }
  }
 
  cancelPomodoro() {
    this.isPomodoroActive = false;
    this.cancelPomodoro$.next('cancel');
  }
 
  completePomodoro() {
    this.isPomodoroActive = false;
    this.completePomodoro$.next('complete');
  
    // ??tape n??1 : R??cup??rer la t??che courante.
    this.currentTask = this.getCurrentTask();
    
    // ??tape n??2 : Incr??menter la t??che courante.
    if(this.currentTask) {
      this.currentTask.done++;
    }

    // ??tape n??3 : V??rifier si la journ??e de travail est termin??e.
    this.isWorkdayComplete = (this.getCurrentTask() === undefined);
  }
}
