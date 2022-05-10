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
      estado: 'En reparación',
      prioridad: 'Alta',
      fecha_compromiso: '2022-05-31 17:00:00',
      observaciones: 'Este dispositivo no funciona sin una conexión a internet',
      averia: 'Dispositivo no funciona',
      accesorios: 'cargador, cable,',
      cliente: {
        id: 1,
        nombre_fiscal: 'Cliente 1',
        telefono: '123456789',
        email: 'cliente@gmail.com',
      },
      dispositivo: {
        id: 1,
        tipo: 'movil',
        modelo: 'Iphone X',
        marca: 'Apple'
      },
      tecnico: {
        id: 1,
        nombre: 'Carlos',
        email: 'tecnico@gmail.com'
      }
    },
    {
      id: 1,
      estado: 'Pendiente',
      prioridad: 'Media',
      fecha_compromiso: '2022-05-31 17:00:00',
      observaciones: 'Este dispositivo no funciona sin una conexión a internet',
      averia: 'Dispositivo no funciona',
      accesorios: 'cargador, cable,',
      cliente: {
        id: 2,
        nombre_fiscal: 'Cliente 2',
        telefono: '123456789',
        email: 'cliente@gmail.com',
      },
      dispositivo: {
        id: 2,
        tipo: 'movil',
        modelo: 'Iphone X',
        marca: 'Apple'
      },
      tecnico: {
        id: 2,
        nombre: 'Tomas',
        email: 'tecnico@gmail.com'
      }
    },
    {
      id: 1,
      estado: 'Pieza pendiente',
      prioridad: 'Baja',
      fecha_compromiso: '2022-05-31 17:00:00',
      observaciones: 'Este dispositivo no funciona sin una conexión a internet',
      averia: 'Dispositivo no funciona',
      accesorios: 'cargador, cable,',
      cliente: {
        id: 3,
        nombre_fiscal: 'Cliente 3',
        telefono: '123456789',
        email: 'cliente@gmail.com',
      },
      dispositivo: {
        id: 3,
        tipo: 'pc',
        modelo: 'Airmac',
        marca: 'Apple',
      },
      tecnico: {
        id: 3,
        nombre: 'Oscar',
        email: 'tecnico@gmail.com'
      }
    },
    {
      id: 1,
      estado: 'Pendiente',
      prioridad: 'Media',
      fecha_compromiso: '2022-05-31 17:00:00',
      observaciones: 'Este dispositivo no funciona sin una conexión a internet',
      averia: 'Dispositivo no funciona',
      accesorios: 'cargador, cable,',
      cliente: {
        id: 4,
        nombre_fiscal: 'Cliente 4',
        telefono: '123456789',
        email: 'cliente@gmail.com',
      },
      dispositivo: {
        id: 4,
        tipo: 'movil',
        modelo: 'Iphone X',
        marca: 'Apple'
      },
      tecnico: {
        id: 4,
        nombre: 'Tomas',
        email: 'tecnico@gmail.com'
      }
    }
  ]

  reparacionesFiltradas: any[] = [...this.reparaciones];

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

  filtrar(prioridad: string) {
    if (prioridad === 'Todas') {
      this.reparacionesFiltradas = this.reparaciones
    }else{
      this.reparacionesFiltradas = this.reparaciones.filter(reparacion => reparacion.prioridad === prioridad);
    }
  }

  enviarCorreo(reparacion: any) {
    
  }

}
