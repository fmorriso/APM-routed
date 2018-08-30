import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

import {AuthService} from './user/auth.service';
import { MessageService } from './messages/message.service';
import {IUser} from './user/user';

@Component({
	selector: 'pm-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	@ViewChild('navbarToggler') navbarToggler: ElementRef;

	pageTitle = 'Acme Product Management';
	loading: boolean = true;

	userName: string;//
	currentUser: IUser;

	constructor(public authService: AuthService,
	            private router: Router,
	            public messageService: MessageService ) {

		router.events
			.subscribe((routerEvent: Event) => {
				this.checkRouterEvent(routerEvent)
			});
	}

	ngOnInit() {
		console.log('AppComponent - ngOnInit');
	}

	logOut(): void {
		console.log(`app.component - logOut() - messageService.isDisplayed=${this.messageService.isDisplayed}`);
		this.authService.logout();
		//Promise.resolve(null).then(() => this.messageService.isDisplayed = false);
		this.router.navigateByUrl('/welcome');
	}

	isDisplayed(): boolean {
		return this.messageService.isDisplayed;
	}

	isLoggedIn(): boolean {
		console.log(`app.component - isLoggedIn() - messageService.isDisplayed=${this.messageService.isDisplayed}`);
		return this.authService.isLoggedIn();
	}

	get currentUserName(): string {
		if (this.isLoggedIn) {
			return this.authService.getCurrentUserName();
		}
		return '';
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
	    this.updateDisplayStatus(true);
	    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    }

    hideMessages(): void {
	    //this.updateDisplayStatus(false);
	    this.updateDisplayStatus(false);
	    this.router.navigate([{ outlets: { popup: null } }]);
        //this.messageService.isDisplayed = false;
	    //Promise.resolve(null).then(() => this.messageService.isDisplayed = false);

    }

    private updateDisplayStatus(status: boolean): void {
	    console.log(`app.component - updateDisplayStatus() - Before - messageService.isDisplayed=${this.messageService.isDisplayed}, changing to ${status}`);
	    this.messageService.isDisplayed = status
	    //Promise.resolve(null).then(() => this.messageService.isDisplayed = status);
	    //Promise.resolve(null).then(() => console.log(`app.component - updateDisplayStatus() - After - messageService.isDisplayed=${this.messageService.isDisplayed}`));
	    //Promise.resolve(null).then(() => this.cd.detectChanges());
    }

	// collapse the "hamburger stack" if it is currently expanded.
	// Should be called on the click event of each navigation anchor.
	// Example:
	/*
	   <li class="nav-item" routerLinkActive="active">
          <a (click)="collapseNav()" class="nav-link" [routerLink]="['/home']">Home</a>
       </li>
       <li class="nav-item" routerLinkActive="active">
           <a (click)="collapseNav()" class="nav-link" [routerLink]="['/about']">About</a>
       </li>
	*/
	collapseNav() {
		if (this.navBarTogglerIsVisible()) {
			console.log('collapseNav in NavigationComponent clicking navbarToggler')
			this.navbarToggler.nativeElement.click();
		}
	}

	private navBarTogglerIsVisible() {
		const isVisible: boolean = (this.navbarToggler.nativeElement.offsetParent !== null);
		return isVisible;
	}
}
