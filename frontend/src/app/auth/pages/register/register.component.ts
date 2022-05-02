import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,private router: Router,private authService: AuthService ) { }

  formRegister: FormGroup = this.fb.group({
    username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  siteKey: string = "6LeC2ZMfAAAAAEE8Z1L4cLhr8IZVMLmdu_WRu5Zp"

  errorUser:string=""
  errorMsg: string = ""
  errorEmail: string = ""
  errorPassword: string = ""

  ngOnInit(): void {
  }

  signUp(){
    const { username, email, password } = this.formRegister.value;
    console.log(username, email, password);
    this.authService.signUp(username,email, password,"cliente")
      .subscribe(
        {
          next: (ok) => {
            if(ok === true && this.formRegister.valid){
              this.router.navigate(['/login']);
              Swal.fire("Bienvenido a Gestirediel!", "Ya puedes iniciar sesión :)", "success");
            }else{
              if(this.formRegister.controls['username'].errors){
                this.errorUser = "El nombre de usuario debe tener entre 3 y 20 caracteres"
              }else{
                this.errorUser = ""
              }
              if(this.formRegister.controls['email'].errors){
                this.errorEmail = "El email no es válido"
              }else{
                this.errorEmail = ""
              }
              if(this.formRegister.controls['password'].errors){
                this.errorPassword = "La contraseña debe tener al menos 6 caracteres"
              }else{
                this.errorPassword = ""
              }
              Swal.fire('Error', ok.msg, 'error')
            }
          }
        }
      )

  }

}
