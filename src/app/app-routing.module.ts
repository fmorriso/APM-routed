import { NgModule }              from '@angular/core';
import { RouterModule }          from '@angular/router';

// These are referenced as components in the AppRoutes definition, so we must import them:
import { WelcomeComponent }      from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

const rootConfig = {enableTracing: false};

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes, rootConfig)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
