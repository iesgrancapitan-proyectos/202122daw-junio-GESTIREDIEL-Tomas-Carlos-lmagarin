import { Component, OnInit, Output } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente';
import { ClientesService } from '../../../shared/services/clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  @Output() cliente!: Cliente

  public form!:FormGroup;

  constructor(private clientesService:ClientesService,
      private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [this.cliente.username, [Validators.required]],
      email: [this.cliente.email, [Validators.required]],
      nombre_fiscal: [this.cliente.nombre_fiscal, [Validators.required]],
      nif: [this.cliente.nif, [Validators.required]],
      domicilio: [this.cliente.domicilio, [Validators.required]],
      CP: [this.cliente.CP, [Validators.required]],
      poblacion: [this.cliente.poblacion, [Validators.required]],
      provincia: [this.cliente.provincia, [Validators.required]],
      persona_contacto: [this.cliente.persona_contacto, [Validators.required]]
    })
  }

  editar(){
    this.clientesService.editarCliente(this.cliente.id_usuario!,this.form.value).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

}
