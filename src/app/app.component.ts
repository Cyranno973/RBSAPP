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
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  isLoggedIn$: Observable<boolean>;
  isMeetingPage: boolean = false;
  isLoginPage: boolean = false;


  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.getCurrentUser().pipe(
      map(user => !!user)
    );

    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isMeetingPage = event.urlAfterRedirects === '/meeting';
      this.isLoginPage = event.urlAfterRedirects === '/connexion';
    });
  }

  logout() {
    this.authService.signOut();
  }
}
