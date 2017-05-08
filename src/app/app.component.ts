import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router';


import {AuthService}       from './user/auth.service';
import {IUser}             from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = 'Acme Product Management';

  userName: string;//
  currentUser: IUser;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {

  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCurrentUserName() : string {
    if(this.isLoggedIn()) {
      return this.authService.getCurrentUserName();
    }
    return '';
  }

}
