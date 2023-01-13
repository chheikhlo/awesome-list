import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { User } from 'src/app/shared/models/user';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [
  ]
})

export class PlanningWorkdayListComponent implements OnInit {
  
  workdays!: Workday[];
 
 constructor(
  private authService: AuthService,
  private workdayService: WorkdaysService) { }
 
 ngOnInit() {
   const user: User|null = this.authService.currentUser;
   if(user && user.id) {
       
   this.workdayService.getWorkdayByUser(user.id).subscribe((workdays: Workday[]) => this.workdays = workdays);
  }
 }
 
 onWorkdayRemoved(workday: Workday) {
  //1.console.info(workday.dueDate);
  /*2.faudrait raffraichir la page pour voir la suppression avec cette methode 2 là. le dernier est mieux 
  .this.workdayService.remove(workday)
  .subscribe(_ => {
   console.log(`${workday.id} has been removed from Firestore !`);
  })*/
  this.workdayService.remove(workday)
   .subscribe(_ => this.workdays = this.workdays.filter(el => el.id !== workday.id))
  }


 }

  /*workday$: Observable<{ dueDate: string; doneTasks: number; remainingTasks: number; }[]> | undefined;
  
  constructor() { }
   
  ngOnInit() {
    this.workday$ = of([
     // Je passe remainingTasks à 0 pour tester mon composant fils :
     { dueDate: 'Lundi', doneTasks: 1, remainingTasks: 0 },
     { dueDate: 'Mardi', doneTasks: 0, remainingTasks: 2 },
     { dueDate: 'Mercredi', doneTasks: 0, remainingTasks: 1 }
    ]).pipe(delay(1000));
   }*/
  
  /*
   workday: { dueDate: string, doneTasks: number, remainingTasks: number }[] = [];
  workday$: Observable<{ dueDate: string; doneTasks: number; remainingTasks: number; }[]> | undefined;
   
 ngOnInit() {
  this.workday = [
   { dueDate: 'Lundi', doneTasks: 1, remainingTasks: 0 },
   { dueDate: 'Mardi', doneTasks: 0, remainingTasks: 2 },
   { dueDate: 'Mercredi', doneTasks: 0, remainingTasks: 1 }
  ];
     
  this.workday$ = of(this.workday).pipe(delay(1000));
 }
  
 // Ajoutez notre gestionnaire d’événement :
 onWorkdayRemoved(dueDate: string) {
  this.workday = this.workday.filter(workday => 
   !dueDate.includes(workday.dueDate)
  );
  this.workday$ = of(this.workday);
 }
   */

 
 

