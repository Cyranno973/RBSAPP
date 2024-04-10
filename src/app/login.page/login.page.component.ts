import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.component.html',
  styleUrls: ['./login.page.component.scss'],
})
export class LoginPage implements OnInit {

formLogin!: FormGroup;
formEmailOublier!: FormGroup;
  afficherFormReset: boolean = false;
errorMessage: string = '';
  userEmail: string = '';
  constructor(private fb: FormBuilder, private userService: UserService, private auth: AuthService, private router: Router) { }
  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['azaz@hotmail.com', Validators.required],
      password: ['aaaaaa', Validators.required]
    })
    this.formEmailOublier = this.fb.group({
      email: ['', [Validators.required, Validators.email],],
    })
  }

  onLogin(form: FormGroup) {
    if(this.formLogin.invalid){return}

    // console.log('Login data:', this.formLogin.value);
    this.auth.signIn(this.formLogin.value)
      .then(v => {
      console.log('vv ',v);
      this.router.navigate(['meeting']).then()
      this.errorMessage = '';
    }).catch((error: any) => {

      // Utilisation de l'erreur retournée par Firebase pour définir un message personnalisé
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        this.errorMessage = 'Email ou mot de passe invalide. Veuillez réessayer.';
      } else {
        // Pour d'autres types d'erreurs, afficher un message générique
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
      }

    });

  }

  sendResetPasswordEmail() {
    if (this.userEmail) {
      this.auth.sendPasswordResetEmail(this.userEmail)
        .then(() => {
          console.log('Email sent.');
          // Gérer la réussite, par exemple en informant l'utilisateur que l'email a été envoyé
        })
        .catch((error) => {
          console.error(error);
          // Gérer l'erreur, par exemple en informant l'utilisateur de l'échec de l'envoi
        });
    }
  }
}
