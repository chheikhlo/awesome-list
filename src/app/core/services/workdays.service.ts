import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // On importe le client Http d'Angular.
import { Workday } from 'src/app/shared/models/workday'; // On importe notre modèle métier Workday.
import { Task } from 'src/app/shared/models/task'; // On importe notre modèle métier Task.
import { environment } from 'src/environments/environment';
import { ToastrService } from './toastr.service';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';
import { tap, catchError, finalize, switchMap } from 'rxjs/operators';
import { DateService } from './date.service';
import { Observable, of } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class WorkdaysService {
 
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private dateService: DateService, // On injecte DateService
    private errorService: ErrorService,
    private loaderService: LoaderService) { }
 
  save(workday: Workday) {
    this.loaderService.setLoading(true);

    const url = `${environment.firebase.firestore.baseURL}/workdays?key=${environment.firebase.apiKey}`;
    const data = this.getWorkdayForFirestore(workday); // C'est cette ligne qui est un peu plus costaud que d'habitude...
    const jwt: string = localStorage.getItem('token')!;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${jwt}`
      })
    };
 
    return this.http.post(url, data, httpOptions).pipe(
      tap(_ => this.toastrService.showToastr({
        category: 'success',
        message: 'Votre journée de travail a été enregistrée avec succès.'
      })),
     // catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  // Pousser le modèle métier d'une journée de travail au Firestore.
private getWorkdayForFirestore(workday: Workday): any {
  let dueDate: number; // Timestamp traditionnelle en secondes.
  let dueDateMs: number; // Timestamp JavaScript en millisecondes.

  if(typeof workday.dueDate == 'string') {
    dueDate = +workday.dueDate;
    dueDateMs = dueDate * 1000;
   } else {
    dueDate = new Date(workday.dueDate).getTime() / 1000;
    dueDateMs = dueDate * 1000;
   }
  
  const displayDate: string = this.dateService.getDisplayDate(new Date(dueDateMs)); // La nouvelle propriété displayDate est prise en compte.
  const tasks: Object = this.getTaskListForFirestore(workday.tasks);
  
  return {
    fields: {
      dueDate: { integerValue: dueDate },
      displayDate: { stringValue: displayDate },
      tasks: tasks,
      notes: { stringValue: workday.notes },
      userId: { stringValue: workday.userId }
     }
  };
 }

 // Mise en place de la liste des tâches d'une journée de travail, pour le Firestore.
private getTaskListForFirestore(tasks: Task[]): any {
  const taskList: any = {
   arrayValue: {
    values: []
   }
  };
  
  tasks.forEach(task => taskList.arrayValue.values.push(this.getTaskForFirestore(task)));
  
  return taskList;
 }

 private getTaskForFirestore(task: Task): any {
  return {
   mapValue: {
    fields: {
     title: { stringValue: task.title },
     todo: { integerValue: task.todo },
     done: { integerValue: task.done },
     completed: { booleanValue: false } 
    }
   }
  }
 }

 getWorkdayByDate(date: string, userId: string): Observable<Workday|null> {
  const url = `${environment.firebase.firestore.baseURL}:runQuery?key=${environment.firebase.apiKey}`;
  const data = this.getSructuredQuery(date, userId);
  const jwt: string = localStorage.getItem('token')!;

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${jwt}`
    })
  };

  return this.http.post(url, data, httpOptions).pipe(
    switchMap((data: any) => {
      const document = data[0].document;
      if(!document) { 
        return of(null);
      }
      return of(this.getWorkdayFromFirestore(document.name, document.fields));
    })
  );
}

private getWorkdayFromFirestore(name: string, fields: any): Workday {
  const tasks: Task[] = [];
  const workdayId: string = name.split('/')[6];
   
  fields.tasks.arrayValue.values.forEach((data: any) => {
    const task: Task = new Task({
      completed: data.mapValue.fields.completed.booleanValue,
      done: data.mapValue.fields.done.integerValue,
      title: data.mapValue.fields.title.stringValue,
      todo: data.mapValue.fields.todo.integerValue
    });
    tasks.push(task);
  });
 
  return new Workday({
    id: workdayId,
    userId: fields.userId.stringValue,
    notes: fields.notes.stringValue,
    displayDate: fields.displayDate.stringValue,
    dueDate: fields.dueDate.integerValue,
    tasks: tasks
  });
}

private getSructuredQuery(date: string, userId: string): any {
  return {
    'structuredQuery': {
      'from': [{
        'collectionId': 'workdays'
      }],
      'where': {
        'compositeFilter': {
          'op': 'AND',
          'filters': [
            {
              'fieldFilter': {
                'field': { 'fieldPath': 'displayDate' },
                'op': 'EQUAL',
                'value': { 'stringValue': date }
              }
            },
            {
              'fieldFilter': {
                'field': { 'fieldPath': 'userId' },
                'op': 'EQUAL',
                'value': { 'stringValue': userId }
              }
            }
          ]
        }
      },
      'limit': 1
    }
  };
}

update(workday: Workday) {
  const url = `${environment.firebase.firestore.baseURL}/workdays/${workday.id}?key=${environment.firebase.apiKey}&currentDocument.exists=true`;
  const data = this.getWorkdayForFirestore(workday);
  const jwt: string = localStorage.getItem('token')!;
  const httpOptions = {
   headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${jwt}`
   })
  };
  
  return this.http.patch(url, data, httpOptions).pipe(
   tap(_ => this.toastrService.showToastr({
    category: 'success',
    message: 'Votre journée de travail a été sauvegardée avec succès.'
   })),
  // catchError(error => this.errorService.handleError(error)),
   finalize(() => this.loaderService.setLoading(false))
  );
 }

 getWorkdayByUser(userId: string): any {
  const url = `${environment.firebase.firestore.baseURL}:runQuery?key=${environment.firebase.apiKey}`;
  const data = this.getWorkdayByUserQuery(userId);
  const jwt: string = localStorage.getItem('token')!;
  
  const httpOptions = {
   headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${jwt}`
   })
  };
  
  return this.http.post(url, data, httpOptions).pipe(
   switchMap((workdaysData: any) => {
    const workdays: Workday[] = [];
    workdaysData.forEach((data: any) => {
     if (data && data.document) {
      const workday: Workday = this.getWorkdayFromFirestore(data.document.name, data.document.fields);
      workdays.push(workday);
     }
    })
    return of(workdays);
   }),
   //catchError(error => this.errorService.handleError(error))
  );
 }

 private getWorkdayByUserQuery(userId: string): any {
  return {
   'structuredQuery': {
    'from': [{
     'collectionId': 'workdays'
    }],
    'where': {
     'fieldFilter': {
      'field': { 'fieldPath': 'userId' },
      'op': 'EQUAL',
      'value': { 'stringValue': userId }
     }
    },
    "orderBy": [{
     "field": {
      "fieldPath": "dueDate"
     },
     "direction": "DESCENDING"
    }]
   }
  };
 }
}