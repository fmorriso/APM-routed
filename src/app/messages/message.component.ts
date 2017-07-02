import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {MessageService} from '../messages/message.service';

@Component({
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.css']
})
export class MessageComponent  implements OnInit {

	constructor(private messageService: MessageService,
	            private router: Router) {
	}

	ngOnInit() {
		this.messageService.isDisplayed = false;
	}

	get messages(): string[] {
		return this.messageService.messages;
	}

	close(): void {
		// Close the popup.
		this.router.navigate([{outlets: {popup: null}}]);
		this.messageService.isDisplayed = false;
	}
}
