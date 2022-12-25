import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: [
  ]
})
export class PlanningWorkdayItemComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {}

  /*
  @Input() workday: { dueDate: string, doneTasks: number, remainingTasks: number } = {
    dueDate: '',
    doneTasks: 0,
    remainingTasks: 0
  };*/

 @Input() dueDate: string = "";
 @Input() doneTasks: number | string = 0 ;
 @Input() remainingTasks: number | string = 0;

 @Output() workdayRemoved = new EventEmitter<string>();

 removeWorkday(dueDate: string) {
  this.workdayRemoved.emit(dueDate);
 }
  
 ngOnChanges(changes: SimpleChanges) {
  for (const propName in changes) {
   this.update(propName, changes[propName].currentValue);
  }
 }
  
 update(propName: string, propValue: string|number) {
  
  switch (propName) {
   case 'dueDate': {
    if ('Lundi' === propValue) { this.dueDate += ' (Aujourd\'hui)'; }
    break;
   }
   case 'doneTasks': {
    if (0 === propValue) { this.doneTasks = 'Aucune tâche terminé.'; }
    break;
   }
   case 'remainingTasks': {
    if (0 === propValue) { 
     this.remainingTasks = 'Journée de travail terminée !';
    } 
    break;
   }
   default: {
    break;
   }
  }
 }
  
}


  

