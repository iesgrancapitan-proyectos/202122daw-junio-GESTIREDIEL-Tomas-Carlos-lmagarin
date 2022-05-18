import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../shared/services/clientes.service';
import { Cliente } from '../../../interfaces/cliente.interface';
import Swal from 'sweetalert2';
import { Dispositivo } from 'src/app/interfaces/dispositivo.interface';

@Component({
  selector: 'app-create-dispositivo-form',
  templateUrl: './create-dispositivo-form.component.html',
  styleUrls: ['./create-dispositivo-form.component.css']
})
export class CreateDispositivoFormComponent implements OnInit {

  public form!: FormGroup;
  @Input() cliente!:Cliente
  @Output() 
  actualizarLista = new EventEmitter<Dispositivo>();

  constructor(private fb: FormBuilder,
              private clientesService:ClientesService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tipo: ["", [Validators.required]],
      marca: ["", [Validators.required]],
      modelo: ["", [Validators.required]],
      numero_serie: ["", [Validators.required]],
      pin_sim: [""],
      codigo_desbloqueo: [""],
    })
  }


  crearDispositivo() {
    this.clientesService.createDispositivo(this.cliente.id!,this.form.value).subscribe(
      {
        next: (res) => {
          Swal.fire({
            title: 'Dispositivo creado',
            text: 'El dispositivo se ha creado correctamente',
            icon: 'success'
          })
          this.form.reset();
          this.actualizarLista.emit(res);
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al crear el dispositivo',
            icon: 'error'
          })
        }
      }
    )
  }

  visibility(field: string):string {
    if (this.form.controls[field].invalid && this.form.controls[field].touched) {
      return "visible";
    } else {
      return "hidden";
    }
  }
}
