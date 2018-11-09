import { Component, OnInit } from '@angular/core';
import {AuthService} from "@eo-sdk/core";
import {APP_CONSTANTS} from "../../app.constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form:any = {};
  loginError: string;

  constructor(private auth:AuthService) { }

  login() {
    this.auth.login(APP_CONSTANTS.host, this.form.clientNo, this.form.password)
      .subscribe(() => {
        this.loginError = null;
      }, err => {
        this.loginError = err.status === '401' ? 'Invalid login credentials' : 'Server error';
      })
  }
}
