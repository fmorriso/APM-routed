import {Component, OnInit} from '@angular/core';

import {AuthService} from './user/auth.service';
import {IUser} from './user/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle: string = 'Acme Product Management';

  userName: string;//
  currentUser: IUser;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUser
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
