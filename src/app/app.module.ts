import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {TestComponent} from "./test/test.component";

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [BrowserModule, FormsModule,IonicModule,   IonicModule.forRoot(), HttpClientModule, RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
