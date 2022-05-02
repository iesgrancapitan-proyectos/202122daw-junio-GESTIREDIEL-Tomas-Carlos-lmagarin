import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(20)]],
  });
  siteKey: string = "6LeC2ZMfAAAAAEE8Z1L4cLhr8IZVMLmdu_WRu5Zp"
  errorEmail: string = ""

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  sendPass() {

    const { email } = this.formLogin.value;

    this.authService.sendEmail(email).subscribe(
      (resp) => {
        if (resp) {
          Swal.fire({
            title: 'Enviado',
            text: 'Se ha enviado un correo para restablecer la contraseña',
            icon: 'success',
            confirmButtonText: 'Ok'
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

}
