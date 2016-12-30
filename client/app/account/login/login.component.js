import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';

import { AuthService } from '../../../components/auth/auth.service';

@Component({
  selector: 'login',
  template: require('./login.html'),
})
export class LoginComponent {
  user = {
    name: '',
    email: '',
    password: '',
  };
  errors = {login: undefined};
  submitted = false;
  AuthService;

  StateService;

  static parameters = [AuthService, StateService];
  constructor(_AuthService_, _StateService_) {
    this.AuthService = _AuthService_;

    this.StateService = _StateService_;
  }

  login() {
    this.submitted = true;

    return this.AuthService.login({
      email: this.user.email,
      password: this.user.password
    })
      .then(() => {
        // Logged in, redirect to home
        this.StateService.go('main');
      })
      .catch(err => {
        this.errors.login = err.message;
      });
  }
}
