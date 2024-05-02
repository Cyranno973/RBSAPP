import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Event as RouterEvent, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isMeetingPage: boolean = false;
  isLoginPage: boolean = false;
  isInscriptionPage: boolean = false;


  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.getCurrentUser().pipe(
      map(user => !!user)
    );
    this.isAdmin$ = this.authService.getCurrentUserData().pipe(
      map(userData => userData ? userData.roles.includes('admin') : false)
    );

    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isMeetingPage = event.urlAfterRedirects === '/meeting';
      this.isLoginPage = event.urlAfterRedirects === '/connexion';
      this.isInscriptionPage = event.urlAfterRedirects === '/inscription';
    });
  }

  logout() {
    this.authService.signOut();
  }
  ngOnInit(): void {

  }
}
