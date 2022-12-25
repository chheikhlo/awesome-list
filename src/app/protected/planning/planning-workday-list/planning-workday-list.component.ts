import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [
  ]
})
export class PlanningWorkdayListComponent implements OnInit {
  
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
   
 }