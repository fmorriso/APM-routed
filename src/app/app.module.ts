//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule  } from 'angular-in-memory-web-api';

// 3rd-party imports

// Imports for loading & configuring the in-memory web api
import {ProductData} from './products/product-data';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './home/welcome.component';
import {PageNotFoundComponent} from './page-not-found.component';
/* Feature Modules */
//NOT WANTED when lazy loading: import {ProductModule} from './products/product.module';

import {UserModule} from './user/user.module';
import {MessageModule} from './messages/message.module';
import {SharedModule} from './shared/shared.module';
import { MenuComponent } from './home/menu.component';

/*
Warning:
When .forRoot() is in an external app-routing.module,
you must specify that module last, which in this case,
is AppRoutingModule.

Lazy Loading Node:
In order to lazy load the ProductModule, it must NOT be mentioned in the imports section below.
*/
@NgModule({
	imports: [
		BrowserModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(ProductData, {delay: 1500}),
		SharedModule,
		//ProductModule,
		UserModule,
		MessageModule,
		AppRoutingModule
	],
	declarations: [
		AppComponent,
		WelcomeComponent,
		PageNotFoundComponent,
		MenuComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
