import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    errorMessage: string;
    pageTitle = 'Log In';
    userName: string;
    password: string;

    constructor(private authService: AuthService) { }

    login(loginForm: NgForm) {
        if (loginForm && loginForm.valid) {
            this.userName = loginForm.form.value.userName;
            this.password = loginForm.form.value.password;
            this.authService.login(this.userName, this.password);

            // Navigate to the Product List page after log in.
        } else {
            this.errorMessage = 'Please enter a user name and password.';
        };
    }
}
