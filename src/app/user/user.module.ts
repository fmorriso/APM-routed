import { NgModule }       from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService }    from './auth.service';
import { AuthGuard }      from './auth-guard.service';

import { SharedModule }   from '../shared/shared.module';

const childRoutes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(childRoutes)
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class UserModule { }
