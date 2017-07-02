import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../shared/shared.module';

import {MessageComponent} from './message.component';
import {MessageService} from './message.service';

const childRoutes = [
	{
		path: 'messages',
		component: MessageComponent,
		outlet: 'popup'
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(childRoutes)
	],
	declarations: [
		MessageComponent
	],
	providers: [
		MessageService
	]
})
export class MessageModule {
}
