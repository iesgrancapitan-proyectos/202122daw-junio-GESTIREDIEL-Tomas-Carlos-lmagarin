import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ReparacionesService } from '../../../shared/services/reparaciones.service';
import { TecnicosService } from '../../../shared/services/tecnicos.service';
import { Tecnico } from '../../../interfaces/tecnico.interface';
import { Dispositivo } from '../../../interfaces/dispositivo.interface';
import { CreateReparacionStepperComponent } from '../create-reparacion-stepper/create-reparacion-stepper.component';
import { MatDialogRef } from '@angular/material/dialog';

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

  today = new Date().toISOString().split('.')[0]

  constructor(
      private fb: FormBuilder,
      private reparacionesService:ReparacionesService,
      private tecnicosService: TecnicosService,
      public dialogRef: MatDialogRef<CreateReparacionStepperComponent>
  ) { }

  ngOnInit(): void {
    this.today=this.today.split(':')[0]+':'+this.today.split(':')[1]
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
    let fecha_formated = this.form.controls['fecha_compromiso'].value.replace("T", ' ');
    fecha_formated = fecha_formated + " UTC";

    const reparacion = {
      accesorios: this.form.controls['accesorios'].value,
      fecha_compromiso: fecha_formated,
      averia: this.form.controls['averia'].value,
      observaciones: this.form.controls['observaciones'].value,
      id_tecnico: parseInt(this.form.controls['tecnico'].value),
      id_dispositivo: this.dispositivo.id,
      estado: 'Pendiente'
    };

    this.reparacionesService.createReparacion(reparacion).subscribe({
      next: () => {
        Swal.fire({
          title: 'Reparación creada',
          text: 'La reparación se ha creado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.dialogRef.close(true);
        })
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al crear la reparación',
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
