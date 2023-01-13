import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'awesome-list';

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ){}

  /*
  private tryAutoLogin() {
    const token = localStorage.getItem('token');
    
    if (!token) { return; }
    
    const expirationDate = +localStorage.getItem('expirationDate');
    const now = new Date().getTime();
    
    if (now >= expirationDate) {
     return;
    }
    
    const userId = localStorage.getItem('userId');
    // Ne plus appeler usersService.get(userId, token), le paramètre 'token' n'est plus utile.
    this.usersService.get(userId).subscribe(user => {
     this.authService.autoLogin(user);
    });
   }
   */
}
