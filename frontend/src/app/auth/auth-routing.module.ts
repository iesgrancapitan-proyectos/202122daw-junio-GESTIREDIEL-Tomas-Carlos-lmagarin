import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent
  },
 {
    path: '**',
    redirectTo: ''
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
