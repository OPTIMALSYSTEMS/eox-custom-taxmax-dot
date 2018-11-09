import { Component } from '@angular/core';
import {AuthService} from "@eo-sdk/core";
import {AppService, Client} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authenticated: boolean;
  client: Client;

  constructor(private auth: AuthService, private appService:AppService){
    this.auth.authenticated$.subscribe(authenticated => this.authenticated = authenticated);
    this.appService.client$.subscribe(client => this.client = client);
  }

  close() {
    window.close();
  }
}
