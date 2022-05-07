import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { RouterModule } from '@angular/router';
import { NewPasswordComponent } from './pages/new-password/new-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    PasswordResetComponent,
    NewPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    RouterModule
  ]
})
export class AuthModule { }
