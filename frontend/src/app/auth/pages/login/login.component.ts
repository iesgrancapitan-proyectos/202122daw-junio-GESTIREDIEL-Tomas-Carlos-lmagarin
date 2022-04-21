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
              Swal.fire('Error', ok.msg, 'error')
            }
          },
          error:()=>{
            console.log("Error")
          }
        }
      )
  }

}
