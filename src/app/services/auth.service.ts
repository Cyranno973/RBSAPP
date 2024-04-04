import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Credentials} from "../models/credentials";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {BehaviorSubject, firstValueFrom, Observable, of, switchMap} from "rxjs";
import firebase from "firebase/compat";
import User = firebase.User;
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);
  constructor(private afAuth: AngularFireAuth, private  firestore: AngularFirestore, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser.next(user); // Met à jour currentUser avec l'utilisateur actuel ou null
    });
  }

  // Inscription avec email et mot de passe

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


  // Connexion avec email et mot de passe
  async signIn(credentials: Credentials) {
    const credential = await this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
    // const uid = credential.user?.uid;
    // // Récupérer les rôles de l'utilisateur depuis Firestore
    // const userObservable = this.firestore.doc(`users/${uid}`).valueChanges();
    // const user = await firstValueFrom(userObservable);
    // if (user) {
    //   // Ici, vous pouvez stocker les rôles de l'utilisateur dans un BehaviorSubject ou les retourner directement
    //   console.log(user); // Affiche les informations de l'utilisateur, y compris ses rôles
    //   return user;
    // } else {
    //   // Gérer le cas où l'utilisateur n'a pas de document dans Firestore
    //   return null;
    // }
  }
  async sendPasswordResetEmail(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }
  // Déconnexion
  async signOut() {
     await this.afAuth.signOut();
    this.router.navigate(['/connexion']).then();
  }
}
