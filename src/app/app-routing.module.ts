import { NgModule }              from '@angular/core';
import { RouterModule }          from '@angular/router';

// these are references in the forRoot call below:
import { WelcomeComponent }      from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports:[
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
