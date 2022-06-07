import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reparacion } from '../../../interfaces/reparacion.interface';
import { ReparacionesService } from '../../services/reparaciones.service';

@Component({
  selector: 'app-lista-reparaciones',
  templateUrl: './lista-reparaciones.component.html',
  styleUrls: ['./lista-reparaciones.component.css']
})
export class ListaReparacionesComponent implements OnInit, OnDestroy {

  reparaciones: Reparacion[] = [];

  @Input() actualizar!: Observable<void>;
  @Input() UidTecnico!: string;

  private eventsSubscription: any

  constructor(private reparacionesService:ReparacionesService ) { }

  ngOnDestroy(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    if (this.actualizar) {
      this.eventsSubscription = this.actualizar.subscribe(() => {
        this.actualizarDatos()
      })
    }
    this.actualizarDatos()
  }

  actualizarDatos() {
    if (this.UidTecnico) {
      this.reparacionesService.getReparacionPorTecnico(this.UidTecnico).subscribe({
        next: (reparaciones: Reparacion[]) => {
          this.reparaciones = reparaciones
        }
      })
    } else {
      this.reparacionesService.getReparaciones().subscribe({
        next: (reparaciones: Reparacion[]) => {
          this.reparaciones = reparaciones
        }
      });
    }
  }
}
