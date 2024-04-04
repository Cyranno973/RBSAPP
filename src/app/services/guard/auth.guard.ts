import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export const canActivateAuth: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree = (route, state) => {
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);

  return afAuth.authState.pipe(
    map(user => {
      console.log(user);
      return (!!user)
    }), // Convertit l'objet user en booléen : true si l'utilisateur est connecté, false sinon
    tap(isLoggedIn => {
      console.log(isLoggedIn);
      if (!isLoggedIn) {
        console.log('Accès refusé - Redirection vers la page de login');
        router.navigate(['/connexion']).then(); // Redirige l'utilisateur vers la page de login s'il n'est pas connecté
      }
    })
  );
};
