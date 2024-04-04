import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }
  // Ajouter un nouvel utilisateur
  addUser(user: any) {
    return this.firestore.collection('users').add(user);
  }

// Obtenir un utilisateur par son ID
  getUserById(id: string) {
    return this.firestore.collection('users').doc(id).valueChanges();
  }

// Obtenir tous les utilisateurs
  getAllUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

// Mettre à jour un utilisateur
  updateUser(id: string, user: any) {
    return this.firestore.collection('users').doc(id).update(user);
  }

// Supprimer un utilisateur
  deleteUser(id: string) {
    return this.firestore.collection('users').doc(id).delete();
  }

}
