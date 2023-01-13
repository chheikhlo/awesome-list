import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { switchMap, tap, catchError, finalize, delay } from 'rxjs/operators';
import { UsersService } from './users.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { ToastrService } from './toastr.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  readonly user$: Observable<User|null> = this.user.asObservable();
  
  constructor(
    private http: HttpClient, 
    private usersService: UsersService, 
    private errorService: ErrorService, 
    private loaderService: LoaderService,
    private router: Router,
    private toastrService: ToastrService) { }

  updateUserState(user: User): Observable<User|null> {
    this.loaderService.setLoading(true);
    return this.usersService.update(user).pipe(
      tap(user => this.user.next(user)),
      tap(_ => this.toastrService.showToastr({
        category: 'success',
        message: 'Vos informations ont été mises à jour !'
      })),
     // catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
      );
    }
    
    get currentUser(): User|null {
    return this.user.getValue();
  }  

  public login(email: string, password: string): Observable<User|null> {
    
    this.loaderService.setLoading(true);
    
    const url = `${environment.firebase.auth.baseURL}/verifyPassword?key=
                 ${environment.firebase.apiKey}`;
    const data = {
     email: email,
     password: password,
     returnSecureToken: true
    };
    
    /* A Supp 
    const httpOptions = {
     headers: new HttpHeaders({'Content-Type':  'application/json'})
    };*/
    
    return this.http.post<User>(url, data, /*httpOptions est remplacer par {} puisqur HttpOptions est supprimé*/{}).pipe(
      switchMap((data: any) => {
       const userId: string = data.localId;
       const jwt: string = data.idToken;
       
       this.saveAuthData(userId, jwt);
       return this.usersService.get(userId /*2nd param jwt A supp, jwt: string*/);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)), // On déclenche la minuterie !
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
    
       this.saveAuthData(data.localId, jwt);
       return this.usersService.save(user /*2nd param jwt A supp, jwt: string*/);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)), // On déclenche la minuterie !
      //catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
     );
  }

  logout(): void {
    localStorage.removeItem('expirationDate');  
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    this.user.next(null);
    this.router.navigate(['/login']);
  }

    //On ajoute la méthode qui déclenche cette fameuse minuterie : 
  private logoutTimer(expirationTime: number): void {
    of(true).pipe(
    delay(expirationTime * 1000)
    ).subscribe(_ => this.logout());
  }

  // Pour automatiser la connexion du user une fois revenu sur l'app grace au localStorage
  private saveAuthData(userId: string, token: string) {
    const now = new Date();
    const expirationDate = (now.getTime() + 3600 * 1000).toString();
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
   }

   
   autoLogin(user: User) {
    this.user.next(user);
    this.router.navigate(['app/dashboard']);
   }
}
