import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'new-password/:token',
    component: NewPasswordComponent
  },
 {
    path: '**',
    redirectTo: 'login'
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
