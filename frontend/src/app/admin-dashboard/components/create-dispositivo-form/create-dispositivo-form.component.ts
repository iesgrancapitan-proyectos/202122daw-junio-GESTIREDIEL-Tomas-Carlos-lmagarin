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

  public formCrear!: FormGroup;
  public formEditar!: FormGroup;
  public form!: FormGroup;
  @Input() cliente!:Cliente
  @Input() dispositivo!:Dispositivo
  @Output() 
  actualizarLista = new EventEmitter<Dispositivo>();

  @Output()
  nuevoDispositivo = new EventEmitter();
  @Output()
  actualizarDispositivo = new EventEmitter<Dispositivo>();

  constructor(private fb: FormBuilder,
              private clientesService:ClientesService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.dispositivo){
      this.form = this.fb.group({
        tipo: [this.dispositivo.tipo, [Validators.required]],
        marca: [this.dispositivo.marca, [Validators.required]],
        modelo: [this.dispositivo.modelo, [Validators.required]],
        numero_serie: [this.dispositivo.numero_serie, [Validators.required]],
        pin_sim: [this.dispositivo.pin_sim],
        codigo_desbloqueo: [this.dispositivo.codigo_desbloqueo]
      })
    }else{
      this.form = this.fb.group({
        tipo: ["", [Validators.required]],
        marca: ["", [Validators.required]],
        modelo: ["", [Validators.required]],
        numero_serie: ["", [Validators.required]],
        pin_sim: [""],
        codigo_desbloqueo: [""]
      })
    }
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

  editarDispositivo() {
    this.clientesService.editarDispositivo(this.dispositivo.id!,this.form.value).subscribe({
      next: () => {
        Swal.fire({
          title: 'Dispositivo editado',
          text: 'El dispositivo se ha editado correctamente',
          icon: 'success'
        })
        this.actualizarDispositivo.emit({id: this.dispositivo.id!,...this.form.value});
        this.dispositivo = this.form.value;
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al editar el dispositivo',
          icon: 'error'
        })
      }
    })
  }

  visibility(field: string):string {
    if (this.form.controls[field].invalid && this.form.controls[field].touched) {
      return "visible";
    } else {
      return "hidden";
    }
  }
}
