import {Component, OnInit } from '@angular/core';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

import {AuthService} from './user/auth.service';
import { MessageService } from './messages/message.service';
import {IUser} from './user/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	pageTitle = 'Acme Product Management';
	loading: boolean = true;

	userName: string;//
	currentUser: IUser;

	constructor(private authService: AuthService,
	            private router: Router,
	            private messageService: MessageService) {

		router.events
			.subscribe((routerEvent: Event) => {
				this.checkRouterEvent(routerEvent)
			});
	}

	ngOnInit() {

	}

	logOut(): void {
		this.authService.logout();
		this.router.navigateByUrl('/welcome');
	}

	isDisplayed(): boolean {
		return this.messageService.isDisplayed;
	}

	isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}

	getCurrentUserName(): string {
		if (this.isLoggedIn) {
			return this.authService.getCurrentUserName();
		}
		return '';
	}

	private checkRouterEvent(routerEvent: Event): void {
		if (routerEvent instanceof NavigationStart) {
			this.loading = true;
		}

		if (routerEvent instanceof NavigationEnd ||
			routerEvent instanceof NavigationCancel ||
			routerEvent instanceof NavigationError) {
			this.loading = false;
		}
	}

    displayMessages(): void {
	    //this.updateDisplayStatus(true);
		this.router.navigate([{ outlets: { popup: ['messages'] } }]);
	    this.updateDisplayStatus(true);
        //this.messageService.isDisplayed = true;
	    //Promise.resolve(null).then(() => this.messageService.isDisplayed = true);
    }

    hideMessages(): void {
	    //this.updateDisplayStatus(false);
        this.router.navigate([{ outlets: { popup: null } }]);
        this.messageService.isDisplayed = false;
	    //Promise.resolve(null).then(() => this.messageService.isDisplayed = false);
    }

    private updateDisplayStatus(status: boolean): void {
	    Promise.resolve(null).then(() => this.messageService.isDisplayed = status);
    }
}
