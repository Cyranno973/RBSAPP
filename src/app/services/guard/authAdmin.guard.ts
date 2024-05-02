import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, switchMap, tap} from 'rxjs';
import {inject} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {User} from '../../models/user';

export const canActivateAdmin: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree = (route, state) => {
  const afAuth = inject(AngularFireAuth);
  const firestore = inject(AngularFirestore);
  const router = inject(Router);

  return afAuth.authState.pipe(
    switchMap(user => {
      if (!user) {
        console.log('Non connecté - Redirection vers la page de connexion');
        router.navigate(['/connexion']).then();
        return [false]; // Retourne false si l'utilisateur n'est pas connecté
      }
      return firestore.collection<User>('users').doc(user.uid).valueChanges().pipe(
        map(userData => {
          const roles = userData ? userData.roles : [];
          return roles.includes('admin'); // Vérifie si le rôle contient 'admin'
        })
      );
    }),
    tap(isAdmin => {
      if (!isAdmin) {
        console.log('Accès refusé - L\'utilisateur n\'est pas admin');
        router.navigate(['/']).then(); // Redirige vers une page d'accueil ou une page d'erreur si non admin
      }
    })
  );
};
