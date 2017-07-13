import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {MessageService} from '../messages/message.service';

@Component({
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss']
})
export class MessageComponent  implements OnInit {

	constructor(public messageService: MessageService,
	            private router: Router) {
	}

	ngOnInit() {
		// do NOT initialize messageService.isDisplayed - seems to mess up the *ngIf in the HTML
	}

	get messages(): string[] {
		return this.messageService.messages;
	}

	close(): void {
		// Close the popup.
		Promise.resolve(null).then(() => this.messageService.isDisplayed = false);
		this.router.navigate([{outlets: {popup: null}}]);

	}
}
