import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {LoginPage} from "./login.page/login.page.component";
import {SignUpPage} from "./sign-up/sign-up.page";
import {canActivateAuth} from "./services/guard/auth.guard";
import {LoginGuard} from "./services/guard/login.guard";
import {canActivateAdmin} from "./services/guard/authAdmin.guard";

export const routes: Routes = [
  {path: '',  redirectTo: 'connexion', pathMatch: "full", title: 'connexion'},
  {path: 'connexion', component: LoginPage,  canActivate: [LoginGuard],title: 'connexion'},
  {path: 'inscription', component: SignUpPage,  title: 'test5' , canActivate:  [canActivateAdmin] },
  // {path: 'inscription', component: SignUpPage},
  // {
  //   path: 'sign-up',
  //   loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  // },
  {
    path: 'meeting',
    canActivate: [canActivateAuth],
    title: 'meeting',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: '**',
    title: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
