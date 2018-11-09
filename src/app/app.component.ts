import { Component } from '@angular/core';
import {AuthService} from "@eo-sdk/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authenticated: boolean;

  constructor(private auth: AuthService){
    this.auth.authenticated$.subscribe(authenticated => this.authenticated = authenticated);
  }

  close() {
    window.close();
  }
}
