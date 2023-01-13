import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'al-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  homePath: string = 'home';
  loginPath: string = 'login';
  registerPath: string = 'register';

  user!: User|null;
  private subscription!: Subscription;
   
  constructor(private router: Router, private layoutservice: LayoutService, private authService: AuthService) { }
   
  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.user = user);
  }
   
  public isActive(page: string): boolean {
   return this.router.isActive(page, true);
  }
   
  public navigate(page: string): void {
   this.router.navigate([page]);
  }

  toggleSidenav() {
    this.layoutservice.toggleSidenav();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}