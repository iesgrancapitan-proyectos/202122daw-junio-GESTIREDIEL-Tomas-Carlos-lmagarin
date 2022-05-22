import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClientesService } from '../../services/clientes.service';
import { Usuario } from '../../../auth/AuthResponse.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    nombre_fiscal: new FormControl(''),
    nif: new FormControl(''),
    domicilio: new FormControl(''),
    poblacion: new FormControl(''),
    provincia: new FormControl(''),
    cp: new FormControl(''),
    telefono:new FormControl('')
  });

  constructor(
    private clientesService: ClientesService,
    private fb: FormBuilder, private userService: AuthService,private router: Router
  ) {}

  id!:string;

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.clientesService.getClient(token!).subscribe((res: any) => {
      this.id=res.id;
      this.form = this.fb.group({
        nombre_fiscal: [res.nombre_fiscal, Validators.required],
        nif: [res.nif, Validators.required],
        domicilio: [res.domicilio, Validators.required],
        poblacion: [res.poblacion, Validators.required],
        provincia: [res.provincia, Validators.required],
        cp: [res.CP, Validators.required],
        telefono: [res.telefono, Validators.required],
      });
    });
  }

  public updateClient(): void {
    const user=this.userService.usuario;

    const client:Cliente = {
      nombre_fiscal: this.form.value.nombre_fiscal,
      nif: this.form.value.nif,
      domicilio: this.form.value.domicilio,
      poblacion: this.form.value.poblacion,
      provincia: this.form.value.provincia,
      CP: this.form.value.cp,
      email: user.email,
      telefono: this.form.value.telefono
    };

    this.clientesService.editarCliente(user.uid,client).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos actualizados correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar los datos',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
  }

  public changePassword(): void {
    this.userService.logout();
    this.router.navigate(['/auth/password-reset']);
  }

}
