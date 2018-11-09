import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EoCoreModule} from '@eo-sdk/core';
import {FileDropModule} from 'ngx-file-drop';
import {AppComponent} from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from "@angular/forms";
import { UploadIndicatorComponent } from './components/upload-indicator/upload-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UploadIndicatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FileDropModule,
    EoCoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
