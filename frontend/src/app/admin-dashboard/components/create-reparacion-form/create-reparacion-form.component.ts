import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ReparacionesService } from '../../../shared/services/reparaciones.service';
import { TecnicosService } from '../../../shared/services/tecnicos.service';
import { Tecnico } from '../../../interfaces/tecnico.interface';
import { Dispositivo } from '../../../interfaces/dispositivo.interface';

@Component({
  selector: 'app-create-reparacion-form',
  templateUrl: './create-reparacion-form.component.html',
  styleUrls: ['./create-reparacion-form.component.css']
})
export class CreateReparacionFormComponent implements OnInit {

  form!:FormGroup;
  tecnicos: Tecnico[] = []
  @Input()
  dispositivo!: Dispositivo;

  constructor(
      private fb: FormBuilder,
      private reparacionesService:ReparacionesService,
      private tecnicosService: TecnicosService
  ) { }

  ngOnInit(): void {
    console.log(this.dispositivo);
    this.tecnicosService.getTecnicos().subscribe({
      next: (res) => {
        this.tecnicos = res;
      }
    })
    this.form = this.fb.group({
      accesorios: [''],
      fecha_compromiso: ['',[Validators.required]],
      averia: ['',[Validators.required]],
      observaciones: [''],
      tecnico: ['',[Validators.required]]
    });
  }

  crear(){

    const reparacion = {
      accesorios: this.form.controls['accesorios'].value,
      fecha_compromiso: this.form.controls['fecha_compromiso'].value,
      averia: this.form.controls['averia'].value,
      observaciones: this.form.controls['observaciones'].value,
      id_tecnico: this.form.value.tecnico.id,
      id_dispositivo: this.dispositivo.id,
      estado: 'pendiente'
    };
    this.reparacionesService.createReparacion(reparacion).subscribe({
      next: () => {
        Swal.fire({
          title: 'Reparacion creada',
          text: 'La reparacion se ha creado correctamente',
          icon: 'success'
        })
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al crear la reparacion',
          icon: 'error'
        })
      }
    });
  }

  visibility(field: string):string {
    if (this.form.controls[field].invalid && this.form.controls[field].touched) {
      return "visible";
    } else {
      return "hidden";
    }
  }

}
