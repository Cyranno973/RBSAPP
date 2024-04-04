import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {Tab1Page} from "./tab1/tab1.page";
import {LoginPage} from "./login.page/login.page.component";
import {SignUpPage} from "./sign-up/sign-up.page";
import {canActivateAuth} from "./services/guard/auth.guard";

const routes: Routes = [
  {path: '',  redirectTo: 'connexion', pathMatch: "full"},
  {path: 'connexion', component: LoginPage},
  {path: 'inscription', component: SignUpPage},
  // {path: 'inscription', component: SignUpPage},
  // {
  //   path: 'sign-up',
  //   loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  // },
  {
    path: 'meeting',
    canActivate: [canActivateAuth],
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
