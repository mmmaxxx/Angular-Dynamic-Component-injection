import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoatComponent } from './boat/boat.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GalleryComponent, GalleryModule} from '@ngx-gallery/core';

@NgModule({
  declarations: [
    AppComponent,
    BoatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
      BoatComponent,
      GalleryComponent
  ]
})
export class AppModule { }
