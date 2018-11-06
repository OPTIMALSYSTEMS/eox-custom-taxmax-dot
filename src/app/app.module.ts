import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EoCoreModule} from '@eo-sdk/core';
import {FileDropModule} from 'ngx-file-drop';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
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
