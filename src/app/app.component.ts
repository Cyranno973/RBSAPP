import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isLoggedIn$ = this.authService.getCurrentUser();

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.signOut();
  }
}
