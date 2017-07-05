import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class MessageService implements OnInit {

	ngOnInit(): void {
		//this.isDisplayed = false;
		console.log('MessageService - ngOnInit');
	}

	private _messages: string[] = [];
    public isDisplayed = false;

	addMessage(message: string): void {
		//console.log('addMessage - message=' + message);
		const currentDate = new Date();
		this._messages.unshift(message + ' at ' + currentDate.toLocaleString());
	}

	get messages(): string[] {
		return this._messages;
	}

}
