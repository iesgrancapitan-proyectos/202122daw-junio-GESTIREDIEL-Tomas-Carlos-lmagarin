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
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  errorMsg:string = ""
  errorEmail:string = ""
  errorPassword:string =""

  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }

  login() {
    
    const { email, password } = this.formLogin.value;

    this.authService.login(email,password)
      .subscribe(
        {
          next: (ok) => {
            if (ok === true) {
              //comprobar el tipo de usuario
              this.router.navigate(['/dashboard']);
            }else{
              this.errorMsg = "Usuario o contraseña incorrectos"
              Swal.fire('Error', ok.msg, 'error')
            }
          }
        }
      )
  }

}
