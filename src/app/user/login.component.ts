import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    errorMessage: string;
    pageTitle = 'Log In';
    userName: string;
    password: string;

    constructor(private authService: AuthService,
                private router: Router) { }

    login(loginForm: NgForm) {
        if (loginForm && loginForm.valid) {
            //console.log('login userName=' + loginForm.form.value.userName);
            this.userName = loginForm.form.value.userName;
            //console.log('login password=' + loginForm.form.value.password);
            this.password = loginForm.form.value.password;
            this.authService.login(this.userName, this.password);

            // Navigate to the Product List page after log in.
            this.router.navigate(['/products']);
        } else {
            this.errorMessage = 'Please enter a user name and password.';
        };
    }
}
