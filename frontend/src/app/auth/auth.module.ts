import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RouterModule } from '@angular/router';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    LoginComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    RouterModule,
    MaterialModule
  ]
})
export class AuthModule { }
