import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  constructor(private userService: UserService) { }

  addUser() {
    const newUser = { name: 'John Doe', email: 'john@example.com' };
    this.userService.addUser(newUser).then(() => {
      console.log('Utilisateur ajouté avec succès');
    }).catch(error => {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    });
  }

  ngOnInit(): void {
  }

}
