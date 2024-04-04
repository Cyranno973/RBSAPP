import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {confirmPasswordValidator} from "../validators/password.validator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  formSignUp!: FormGroup;
  errorMessage: string = '';
  userEmail: string = '';
  constructor(private fb: FormBuilder, private userService: UserService, private auth: AuthService, private router: Router) { }
  ngOnInit() {
    this.formSignUp = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required,]]
    },{validators: confirmPasswordValidator})
  }
  onSignUp(form: FormGroup) {
    if(this.formSignUp.invalid){return}
    this.auth.signUp(this.formSignUp.value)
      .then(v => {
        this.errorMessage = '';
        this.router.navigate(['/connexion']).then()
      }).catch((error: any) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.errorMessage = "Cette adresse e-mail est déjà utilisée par un autre compte. Veuillez utiliser une adresse e-mail différente.";
          break;
        case 'auth/invalid-email':
          this.errorMessage = "L'adresse e-mail saisie n'est pas valide. Veuillez vérifier votre saisie.";
          break;
        case 'auth/weak-password':
          this.errorMessage = "Le mot de passe doit contenir au moins 6 caractères, dont un chiffre et une lettre.";
          break;
        case 'auth/operation-not-allowed':
          this.errorMessage = "Nous ne pouvons pas traiter votre inscription pour le moment. Veuillez réessayer plus tard.";
          break;
        default:
          this.errorMessage = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      }
    });
  }
}
