import { NgModule }              from '@angular/core';
import { RouterModule }          from '@angular/router';

// these are referenced a components in the AppRoutes definition, so we must import them:
import { WelcomeComponent }      from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

const AppRoutes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports:[
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
