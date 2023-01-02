import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'al-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  homePath: string = 'home';
  loginPath: string = 'login';
  registerPath: string = 'register';
   
  constructor(private router: Router, private layoutservice: LayoutService) { }
   
  ngOnInit() { }
   
  public isActive(page: string): boolean {
   return this.router.isActive(page, true);
  }
   
  public navigate(page: string): void {
   this.router.navigate([page]);
  }

  toggleSidenav() {
    this.layoutservice.toggleSidenav();
  }
 }