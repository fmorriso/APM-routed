// This service is used throughout the entire application
import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable()
export class SelectiveStrategy implements PreloadingStrategy {

	constructor() {	}

	preload(route: Route, load: Function): Observable<any> {
		// check our custom data element, named preload to see if we should preload or not.
		// That value is set inside the JSON definition of the app-routing.module.ts.
		// Example:
		/*
			{
				path: 'products',
				canLoad: [AuthGuard],
				data: {preload: true},
				loadChildren: 'app/products/product.module#ProductModule'
			}
		 */
		// The above is coupled with our custom preloading strategy that is defined
		// as the second piece of JSON that is passed to RouterModule.forRoute()
		// inside app-routing.module.ts
		console.log(`SelectiveStrategy - route: ${JSON.stringify(route)}`);
		if (route.data && route.data['preload']) {
			return load();
		}
		return Observable.of(null);
	}

}
