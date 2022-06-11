import { Component, OnInit, Output } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente.interface';
import { ClientesService } from '../../../shared/services/clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-cliente-form.component.html',
  styleUrls: ['./edit-cliente-form.component.css']
})
export class EditFormComponent implements OnInit {

  @Output() cliente!: Cliente

  public form!: FormGroup;

  constructor(private clientesService: ClientesService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditFormComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [this.cliente.username, [Validators.required]],
      email: [this.cliente.email, [Validators.required, Validators.email]],
      nombre_fiscal: [this.cliente.nombre_fiscal, [Validators.required]],
      nif: [this.cliente.nif, [Validators.required,Validators.pattern('[0-9]{8}[A-Z]{1}')]],
      domicilio: [this.cliente.domicilio, [Validators.required]],
      CP: [this.cliente.CP, [Validators.required, Validators.pattern('[0-9]{5}')]],
      poblacion: [this.cliente.poblacion, [Validators.required]],
      provincia: [this.cliente.provincia, [Validators.required]],
      persona_contacto: [this.cliente.persona_contacto, [Validators.required]],
      telefono: [this.cliente.telefono, [Validators.required, Validators.pattern('[0-9]{9}')]]
    })
  }

  editar() {
    this.clientesService.editarCliente(this.cliente.id_usuario!, this.form.value).subscribe(
      {
        next: (res) => {
          Swal.fire({
            title: 'Cliente editado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close();
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error'
          })

        }
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  visibility(field: string):string {
    if (this.form.controls[field].invalid && this.form.controls[field].touched) {
      return "visible";
    } else {
      return "hidden";
    }
  }
}
