import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take, tap} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";

export const LoginGuard: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree = (route, state) => {
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);
  return afAuth.authState.pipe(
    take(1),
    map(user => !user),
    tap(isNotLoggedIn => {
      if (!isNotLoggedIn) router.navigate(['/meeting']).then();
    })
  );
}
