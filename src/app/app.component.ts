import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;
  isMeetingPage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.getCurrentUser().pipe(
      map(user => !!user)
    );

    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isMeetingPage = event.urlAfterRedirects === '/meeting';
    });
  }

  logout() {
    this.authService.signOut();
  }
}
