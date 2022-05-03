import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent implements OnInit {
  formPassword: FormGroup = this.fb.group({
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });

  errorPassword: string = '';
  token:string=""

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

  updatePass() {
    this.authService
      .newPassword(this.formPassword.value.password, this.route.snapshot.paramMap.get('token')!)
      .subscribe((resp) => {
        if (resp) {
          Swal.fire({
            title: 'Actualizado',
            text: 'Se ha actualizado la contraseña',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['/login']);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido actualizar la contraseña',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });
  }
}
