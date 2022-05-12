import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientesService } from '../../../shared/services/clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Cliente } from '../../../interfaces/cliente.interface';

@Component({
  selector: 'app-create-cliente-form',
  templateUrl: './create-cliente-form.component.html',
  styleUrls: ['./create-cliente-form.component.css']
})
export class CreateClienteFormComponent implements OnInit {


  public form!: FormGroup;
  @Input()
  inReparacion:boolean = false;
  @Output()
  newClienteOnReparacion = new EventEmitter<Cliente>();

  constructor(private clientesService: ClientesService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateClienteFormComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      nombre_fiscal: ["", [Validators.required]],
      nif: ["", [Validators.required,Validators.pattern('[0-9]{8}[A-Z]{1}')]],
      domicilio: ["", [Validators.required]],
      CP: ["", [Validators.required, Validators.pattern('[0-9]{5}')]],
      poblacion: ["", [Validators.required]],
      provincia: ["", [Validators.required]],
      persona_contacto: ["", [Validators.required]],
      telefono: ["", [Validators.required, Validators.pattern('[0-9]{9}')]],
    })
  }

  crear() {
    this.clientesService.createCliente(this.form.value).subscribe(
      {
        next: (res) => {
          Swal.fire({
            title: 'Cliente creado',
            text: 'El cliente ha sido creado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.dialogRef.close();
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
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

  enviarClienteAReparacion() {
    this.newClienteOnReparacion.emit(this.form.value);
  }
}
