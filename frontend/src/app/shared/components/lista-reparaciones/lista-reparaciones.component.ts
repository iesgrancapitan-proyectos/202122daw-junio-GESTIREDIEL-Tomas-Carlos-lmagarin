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
  reparacionesFiltradas: Reparacion[] = [];

  @Input() actualizar!: Observable<void>;
  @Input() UidTecnico!: string;
  estados: string[] = []

  private eventsSubscription: any

  constructor(private reparacionesService: ReparacionesService) { }

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
          this.reparacionesFiltradas = reparaciones
        }
      })
    } else {
      this.reparacionesService.getReparaciones().subscribe({
        next: (reparaciones: Reparacion[]) => {
          this.reparaciones = reparaciones
          this.reparacionesFiltradas = reparaciones
        }
      });
    }
  }

  filtrar(checked:boolean,estado: string) {
    this.reparacionesFiltradas = this.reparaciones
    if (checked) {
      this.estados.push(estado)
      this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.estados.includes(reparacion.estado!))
    } else {
      this.estados = this.estados.filter(estadoAnterior => estadoAnterior !== estado)

      this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.estados.includes(reparacion.estado!))
      if (this.estados.length === 0) {
        this.reparacionesFiltradas = this.reparaciones
      }
    }
  }
}
