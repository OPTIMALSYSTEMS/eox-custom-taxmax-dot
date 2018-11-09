import {Component, OnInit} from '@angular/core';
import {AuthService} from "@eo-sdk/core";
import {APP_CONSTANTS} from "../../app.constants";
import {switchMap} from "rxjs/operators";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: any = {};
  loginError: string;

  constructor(private auth: AuthService, private appService: AppService) {
    this.appService.client$.subscribe(client => {
      this.form['clientNo'] = client.clientNo;
    })
  }

  login() {
    this.auth.login(APP_CONSTANTS.host, this.form.clientNo, this.form.password)
      .pipe(
        switchMap(() => this.appService.setClient(this.form.clientNo))
      ).subscribe(() => {
      this.loginError = null;
    }, err => {
      this.loginError = err.status === '401' ? 'Invalid login credentials' : 'Server error';
    })
  }
}
