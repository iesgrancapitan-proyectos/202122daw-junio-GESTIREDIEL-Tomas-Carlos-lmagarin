import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reparacion-expand',
  templateUrl: './reparacion-expand.component.html',
  styleUrls: ['./reparacion-expand.component.css']
})
export class ReparacionExpandComponent implements OnInit {

  @Input() reparacion: any;

  constructor() { }

  ngOnInit(): void {
  }

  colorPrioridad(prioridad: string) {
    switch (prioridad) {
      case 'Alta':
        return 'bg-[#EB5757]';
      case 'Media':
        return 'bg-[#F2994A]';
      case 'Baja':
        return 'bg-[#27AE60]';
      default:
        return 'bg-primary-color';
    }
  }

  async enviarCorreo() {
    const {value: mensaje} = await Swal.fire({
      input: 'textarea',
      inputLabel: `Enviar email a ${this.reparacion.cliente.nombre_fiscal}`,
      inputPlaceholder: 'Escribe tu mensaje aquí...',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value) {
            resolve('Escribe un mensaje')
          }
        })
      },
      inputAttributes: {
        'aria-label': 'Escribe tu mensaje aquí'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar'
      
    })
    if (mensaje) {
      //TODO: enviar correo
      Swal.fire({
        title: 'Enviado',
        text: 'Mensaje enviado correctamente',
        icon: 'success'
      })
    }
    
   
  }

  borrar() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar la reparación?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        //TODO: borrar reparacion
        //TODO: actualizar la tabla (esto es con un Output si no sabes te lo explico :) )

        Swal.fire({
          title: 'Eliminada',
          text: `La reparación ha sido eliminada`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }

    })
  }

}
