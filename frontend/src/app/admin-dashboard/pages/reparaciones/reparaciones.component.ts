import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateReparacionStepperComponent } from '../../components/create-reparacion-stepper/create-reparacion-stepper.component';
import { Reparacion } from '../../../interfaces/reparacion.interface';
import { ReparacionesService } from '../../../shared/services/reparaciones.service';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.css']
})
export class ReparacionesComponent implements OnInit {

  reparaciones: Reparacion[] = []

  reparacionesFiltradas: Reparacion[] = [];

  constructor(public dialog: MatDialog,
    private reparacionesService: ReparacionesService) { }

  ngOnInit() {
    this.reparacionesService.getAllReparaciones().subscribe(reparaciones => {
      this.reparaciones = reparaciones;
      this.reparacionesFiltradas = this.reparaciones;
    });
    
  }

  addNewReparacion() {
    const dialogRef = this.dialog.open(CreateReparacionStepperComponent, { panelClass: "custom-modalbox", width: "70%", height: "70%", disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //TODO: actualizar la tabla
        this.reparacionesService.getAllReparaciones().subscribe(reparaciones => {
          this.reparaciones = reparaciones;
          this.reparacionesFiltradas = this.reparaciones;
        });
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
