import {Component, OnInit} from '@angular/core';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';


import {AuthService} from './user/auth.service';
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
	            private router: Router) {
		router.events
			.subscribe((routerEvent: Event) => {
				this.checkRouterEvent(routerEvent)
			});
	}

	ngOnInit() {

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

	logOut(): void {
		this.authService.logout();
		this.router.navigateByUrl('/welcome');
	}

	isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}

	getCurrentUserName(): string {
		if (this.isLoggedIn()) {
			return this.authService.getCurrentUserName();
		}
		return '';
	}


}
