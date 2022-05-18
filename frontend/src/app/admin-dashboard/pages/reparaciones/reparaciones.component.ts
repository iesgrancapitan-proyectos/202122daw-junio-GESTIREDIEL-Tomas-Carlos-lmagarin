import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateReparacionStepperComponent } from '../../components/create-reparacion-stepper/create-reparacion-stepper.component';
import { Reparacion } from '../../../interfaces/reparacion.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.css']
})
export class ReparacionesComponent implements OnInit {

  reparaciones: Reparacion[] = []

  reparacionesFiltradas: Reparacion[] = [];

  newReparacion: Subject<void> = new Subject<void>();


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    
  }

  addNewReparacion() {
    const dialogRef = this.dialog.open(CreateReparacionStepperComponent, { panelClass: "custom-modalbox", width: "70%", height: "70%", disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newReparacion.next()
      }
    });
  }

  filtrar(prioridad: string) {
    // if (prioridad === 'Todas') {
    //   this.reparacionesFiltradas = this.reparaciones
    // } else {
    //   this.reparacionesFiltradas = this.reparaciones.filter(reparacion => reparacion.prioridad === prioridad);
    // }
  }

}
