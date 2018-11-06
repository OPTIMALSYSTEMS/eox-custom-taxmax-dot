import { Component, OnInit } from '@angular/core';
import {APP_CONSTANTS} from "../../app.constants";
import {AuthService} from "@eo-sdk/core";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: any= {};
  loginError: string;

  constructor(private auth: AuthService) { }

  login() {
    this.auth.login(APP_CONSTANTS.host, this.form.clientNo, this.form.password)
      .pipe(
        switchMap(() => this.appService.setClient(this.form.clientNo))
      )
      .subscribe(() => {
        this.loginError = null;
      }, err => {
        // login failed
        if (err.status === 401) {
          this.loginError = 'Invalid login data';
        } else {
          this.loginError = 'Server error!';
        }
      });
  }

}
