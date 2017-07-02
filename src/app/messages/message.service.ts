import {Injectable} from '@angular/core';

@Injectable()
export class MessageService {

	private _messages: string[] = [];
    private _isDisplayed = false;

	addMessage(message: string): void {
		//console.log('addMessage - message=' + message);
		const currentDate = new Date();
		this._messages.unshift(message + ' at ' + currentDate.toLocaleString());
	}

	get isDisplayed(): boolean {
		return this._isDisplayed;
	}

	set isDisplayed(val: boolean){
		this._isDisplayed = val;
	}

	get messages(): string[] {
		return this._messages;
	}

}
