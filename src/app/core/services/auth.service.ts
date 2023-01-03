import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { switchMap, tap, catchError, finalize } from 'rxjs/operators';
import { UsersService } from './users.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { LoaderService } from './loader.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  readonly user$: Observable<User|null> = this.user.asObservable();
  
  constructor(private http: HttpClient, private usersService: UsersService, private errorService: ErrorService, private loaderService: LoaderService) { }

  public login(email: string, password: string): Observable<User|null> {
    
    this.loaderService.setLoading(true);
    
    const url = `${environment.firebase.auth.baseURL}/verifyPassword?key=
                 ${environment.firebase.apiKey}`;
    const data = {
     email: email,
     password: password,
     returnSecureToken: true
    };
    const httpOptions = {
     headers: new HttpHeaders({'Content-Type':  'application/json'})
    };
    
    return this.http.post<User>(url, data, httpOptions).pipe(
      switchMap((data: any) => {
       const userId: string = data.localId;
       const jwt: string = data.idToken;
       
       return this.usersService.get(userId, jwt);
      }),
      tap(user => this.user.next(user)),
     // catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
     );
   }

  public register(name: string, email: string, password: string): Observable<User|null> {
    
    this.loaderService.setLoading(true);

    const url: string = `${environment.firebase.auth.baseURL}/signupNewUser?key=${environment.firebase.apiKey}`;

    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    };
    
    /*
     return this.http.post<User>(url, data, httpOptions);
    */
     return this.http.post(url, data, httpOptions).pipe(
      switchMap((data: any) => {
       const jwt: string = data.idToken;
       const user = new User({
        email: data.email,
        id: data.localId,
        name: name
       });
    
       return this.usersService.save(user, jwt);
      }),
      tap(user => this.user.next(user)),
      //catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
     );
  }

  logout(): any{
    return of(null);
  }
}
