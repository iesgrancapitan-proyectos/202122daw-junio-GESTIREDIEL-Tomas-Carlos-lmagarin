import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    recaptcha: ['', Validators.required]
  });
  siteKey: string = "6LeC2ZMfAAAAAEE8Z1L4cLhr8IZVMLmdu_WRu5Zp"

  errorMsg: string = ""
  errorEmail: string = ""
  errorPassword: string = ""

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    const { email, password } = this.formLogin.value;

    this.authService.login(email, password)
      .subscribe(
        {
          next: (ok) => {
            if (ok === true && this.formLogin.valid) {
              //comprobar el tipo de usuario
              this.router.navigate(['/dashboard']);
            } else {
              if (this.formLogin.controls['recaptcha'].errors) {
                Swal.fire('Error','Es necesario completar el captcha', 'error')
              } else {
                this.errorMsg = "Usuario o contraseña incorrectos"
                Swal.fire('Error', ok.msg, 'error')
              }
            }
          }
        }
      )
  }

}
