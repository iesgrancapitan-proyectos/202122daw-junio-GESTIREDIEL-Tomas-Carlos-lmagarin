import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';

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

  formNewPassword: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50)]],
  });
  siteKey: string = "6LeC2ZMfAAAAAEE8Z1L4cLhr8IZVMLmdu_WRu5Zp"

  errorMsg: string = ""
  errorEmail: string = "Formato de email incorrecto"
  errorPassword: string = "Debe tener al menos 6 caracteres"

  @ViewChild('container') container!:ElementRef;

  hidePassword:boolean = true;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {

    let script = this._renderer2.createElement('script');
    script.src = `//code.tidio.co/w1tmmcitbsntvblwkkkjd5mll2rdcixz.js`
    script.async = true;

    this._renderer2.appendChild(this._document.body, script);
  }

  login() {

    const { email, password } = this.formLogin.value;

    this.authService.login(email, password)
      .subscribe(
        {
          next: (ok) => {
            if (ok === true && this.formLogin.valid) {
              this.authService.getRolByToken().subscribe((rol)=>{
                if(rol === "admin"){
                  this.router.navigate(['/dashboard']);
                }else if(rol === "tecnico"){
                  this.router.navigate(['/tecnico']);
                }else{
                  this.router.navigate(['/cliente']);
                }
              })
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

  sendPass() {

    const { email } = this.formNewPassword.value;

    this.authService.sendEmail(email).subscribe(
      (resp) => {
        if (resp) {
          console.log(resp);
          Swal.fire({
            title: 'Enviado',
            text: 'Se ha enviado un correo para restablecer la contraseña',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/login'])
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido enviar el correo',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      })
  }

  signUpMode(){
    this.container.nativeElement.classList.add("sign-up-mode");
  }

  signInMode(){
    this.container.nativeElement.classList.remove("sign-up-mode");
  }

}
