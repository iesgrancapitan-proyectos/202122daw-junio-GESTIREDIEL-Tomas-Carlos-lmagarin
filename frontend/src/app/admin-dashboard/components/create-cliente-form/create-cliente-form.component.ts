import { Component, OnInit, Output } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente.interface';
import { ClientesService } from '../../../shared/services/clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-cliente-form',
  templateUrl: './create-cliente-form.component.html',
  styleUrls: ['./create-cliente-form.component.css']
})
export class CreateClienteFormComponent implements OnInit {


  public form!: FormGroup;

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
      persona_contacto: ["", [Validators.required]]
    })
  }

  crear() {
    this.clientesService.createCliente(this.form.value).subscribe(
      {
        next: (res) => {
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
