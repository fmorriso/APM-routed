import { Injectable }     from '@angular/core';

import { IUser }          from './user';
import { MessageService } from '../messages/message.service';

@Injectable()
export class AuthService {

    currentUser: (IUser | null);
    redirectUrl: string;

    constructor(private messageService: MessageService) { }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        //console.log('top of auth.service.ts - login, userName =' + userName + ', password=' + password);
        if (!userName || !password) {
            this.messageService.addMessage('Please enter your userName and password');
            return;
        }
        if (userName === 'admin') {
            this.currentUser = {
                id: 1,
                userName: userName,
                isAdmin: true
            };
            //console.log('adding a message in the middle');
            this.messageService.addMessage('Admin login');
            return;
        }
        this.currentUser = {
            id: 2,
            userName: userName,
            isAdmin: false
        };
        //console.log('adding a message at very bottom');
        this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
    }

    logout(): void {
        this.messageService.addMessage(`user ${this.currentUser!.userName} has logged out`);
        this.currentUser = null;
	    //Promise.resolve(null).then(() => this.cd.detectChanges());
    }

    getCurrentUserName() : string {
      if(this.isLoggedIn()) {
        return this.currentUser!.userName;
      }
      return '';
    }
}
