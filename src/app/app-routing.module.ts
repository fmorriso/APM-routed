import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// our custom feature module preloading service
import { SelectiveStrategy } from './selective-strategy.service';

// These are referenced as components in the AppRoutes definition, so we must import them:
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth-guard.service';

//NOTE: the canLoad allows us to avoid downloading the entire Products components suite
//      until/unless the user successfully logs in.
//      We further control the loading process by using our custom preloading
//      strategy service to asynchronously background load the
//      Products component suite after the successful login.
const topLevelRoutes: Routes = [
	{path: 'welcome', component: WelcomeComponent},
	{
		path: 'products',
		canLoad: [AuthGuard],
		data: { preload: true },
		loadChildren: 'app/products/product.module#ProductModule'
	},
	{path: '', redirectTo: 'welcome', pathMatch: 'full'},
	{path: '**', component: PageNotFoundComponent}
];

const rootConfig = {
	enableTracing: true,
	preloadingStragegy: SelectiveStrategy
};

@NgModule({
	imports: [
		RouterModule.forRoot(topLevelRoutes, rootConfig)
	],
	exports: [RouterModule],
	providers: [SelectiveStrategy]
})
export class AppRoutingModule {
}
