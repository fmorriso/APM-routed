import {Injectable} from '@angular/core';

@Injectable()
export class MessageService {
	private _messages: string[] = [];
    isDisplayed = false;

	addMessage(message: string): void {
		//console.log('addMessage - message=' + message);
		const currentDate = new Date();
		this._messages.unshift(message + ' at ' + currentDate.toLocaleString());
	}

	getMessages(): string[] {
		return this._messages;
	}

	public messages(): string[] {
		return this._messages;
	}
}
