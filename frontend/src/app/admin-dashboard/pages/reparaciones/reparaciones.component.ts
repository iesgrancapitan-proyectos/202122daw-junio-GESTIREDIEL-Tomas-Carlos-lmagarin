import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateReparacionStepperComponent } from '../../components/create-reparacion-stepper/create-reparacion-stepper.component';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.css']
})
export class ReparacionesComponent implements OnInit {

  reparaciones = [
    {
      id: 1,
      nombre: 'Reparación 1',
      descripcion: 'Reparación 1',
      estado: 'En reparación',
      prioridad: 'Alta',
      fecha: '01/01/2020',
      hora: '01:01',
      cliente: 'Cliente 1',
      telefono: '123456789',
      email: '',
      direccion: '',
      observaciones: '',
      dispositivo: {
        id: 1,
        nombre: 'Iphone X',
        marca: 'Apple',
        modelo: 'X'
      },
      tecnico: {
        id: 1,
        nombre: 'Tecnico 1',
        email: 'tecnico@gmail.com'
      }
    },
    {
      id: 1,
      nombre: 'Reparación 1',
      descripcion: 'Reparación 1',
      estado: 'Pendiente',
      prioridad: 'Media',
      fecha: '01/01/2020',
      hora: '01:01',
      cliente: 'Cliente 1',
      telefono: '123456789',
      email: '',
      direccion: '',
      observaciones: '',
      dispositivo: {
        id: 1,
        nombre: 'Iphone X',
        marca: 'Apple',
        modelo: 'X'
      },
      tecnico: {
        id: 1,
        nombre: 'Tecnico 1',
        email: 'tecnico@gmail.com'
      }
    },
    {
      id: 1,
      nombre: 'Reparación 1',
      descripcion: 'Reparación 1',
      estado: 'Pieza pedida',
      prioridad: 'Baja',
      fecha: '01/01/2020',
      hora: '01:01',
      cliente: 'Cliente 1',
      telefono: '123456789',
      email: '',
      direccion: '',
      observaciones: '',
      dispositivo: {
        id: 1,
        nombre: 'Iphone X',
        marca: 'Apple',
        modelo: 'X'
      },
      tecnico: {
        id: 1,
        nombre: 'Tecnico 1',
        email: 'tecnico@gmail.com'
      }
    },
    {
      id: 1,
      nombre: 'Reparación 1',
      descripcion: 'Reparación 1',
      estado: 'Pendiente',
      prioridad: 'Alta',
      fecha: '01/01/2020',
      hora: '01:01',
      cliente: 'Cliente 1',
      telefono: '123456789',
      email: '',
      direccion: '',
      observaciones: '',
      dispositivo: {
        id: 1,
        nombre: 'Iphone X',
        marca: 'Apple',
        modelo: 'X'
      },
      tecnico: {
        id: 1,
        nombre: 'Tecnico 1',
        email: 'tecnico@gmail.com'
      }
    }
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addNewReparacion() {
    const dialogRef = this.dialog.open(CreateReparacionStepperComponent, { panelClass: "custom-modalbox", width: "50%", height: "50%", disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //actualizar la tabla
      }
    });
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

}
