import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Credentials } from "../models/credentials";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import firebase from "firebase/compat";
import User = firebase.User;
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser.next(user); // Met à jour currentUser avec l'utilisateur actuel ou null
    });
  }


  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  async signUp(credentials: Credentials, defaultRole = 'user') {
    const credential = await this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    const uid = credential.user?.uid;
    // Stocker les informations supplémentaires de l'utilisateur, y compris son rôle, dans Firestore
    return this.firestore.doc(`users/${uid}`).set({
      email: credentials.email,
      roles: [defaultRole] // Attribuer un rôle par défaut
    });
  }

  async signIn(credentials: Credentials) {
    const credential = await this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
    const uid = credential.user?.uid;
    if (uid) {
      this.getTokenForUser(uid).subscribe(token => {
        if (!token) {
          // Si aucun token, redirigez vers l'authentification externe
          this.redirectToExternalAuth(uid);
        }
        // Sinon, continuez avec le flux normal d'authentification
      });
    }
  }

  getTokenForUser(uid: string): Observable<string | null> {
    return this.firestore.doc(`users/${uid}`).valueChanges().pipe(
      map((userData: any) => userData ? userData.token : null),
      catchError(error => {
        console.error('Erreur lors de la récupération du token:', error);
        return of(null); // Retourne un Observable de null en cas d'erreur
      })
    );
  }

  redirectToExternalAuth(uid: string) {
    const proxyUrl = `http://localhost:3000/api/auth/authenticate/${uid}`;
    window.location.href = proxyUrl;
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/connexion']).then();
  }
}
