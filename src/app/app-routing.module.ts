import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// These are referenced as components in the AppRoutes definition, so we must import them:
import {WelcomeComponent} from './home/welcome.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {AuthGuard} from './user/auth-guard.service';

const topLevelRoutes: Routes = [
	{path: 'welcome', component: WelcomeComponent},
	{
		path: 'products',
		//canActivate: [AuthGuard],
		//data: {preload: true},
		loadChildren: 'app/products/product.module#ProductModule'
	},
	{path: '', redirectTo: 'welcome', pathMatch: 'full'},
	{path: '**', component: PageNotFoundComponent}
];

const rootConfig = {enableTracing: true};

@NgModule({
	imports: [
		RouterModule.forRoot(topLevelRoutes, rootConfig)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
