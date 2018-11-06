import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EoCoreModule} from '@eo-sdk/core';
import {FileDropModule} from 'ngx-file-drop';
import {AppComponent} from './app.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FileDropModule,
    EoCoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
