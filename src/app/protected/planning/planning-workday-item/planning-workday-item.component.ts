import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: [
  ]
})
export class PlanningWorkdayItemComponent implements OnInit {

  @Input() workday: { dueDate: string, doneTasks: number, remainingTasks: number } = {
    dueDate: '',
    doneTasks: 0,
    remainingTasks: 0
  };


  constructor() { }

  ngOnInit(): void {
  }

}
