import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  readonly user$: Observable<User|null> = this.user.asObservable();
  
  constructor(private http: HttpClient, private usersService: UsersService) { }

  login(name: string, email: string, password: string){
    
  }

  register(name: string, email: string, password: string): Observable<User|null> {
    
    const url: string = `${environment.firebase.auth.baseURL}/signupNewUser?key=
    ${environment.firebase.apiKey}`;

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
      })
     );
  }

  logout(): any{
    return of(null);
  }
}
