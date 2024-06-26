import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';


import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {TestComponent} from "./test/test.component";
import {Tab1PageModule} from "./tab1/tab1.module";
import {AppRoutingModule} from "./app-routing.module";
import {UserComponent} from "./user/user.component";
import {LoginPage} from "./login.page/login.page.component";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AuthFormComponentComponent} from "./auth-form-component/auth-form-component.component";
import {SignUpPage} from "./sign-up/sign-up.page";

@NgModule({
  declarations: [AppComponent, TestComponent, UserComponent, SignUpPage, LoginPage, AuthFormComponentComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule,
    IonicModule, IonicModule.forRoot(), HttpClientModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule, Tab1PageModule, ReactiveFormsModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
