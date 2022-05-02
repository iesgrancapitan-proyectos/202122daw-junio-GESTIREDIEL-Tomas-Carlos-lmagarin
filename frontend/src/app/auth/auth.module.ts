import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    RouterModule
  ]
})
export class AuthModule { }
