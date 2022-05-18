import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReparacionesService } from '../../../admin-dashboard/services/reparaciones.service';
import { Reparacion } from '../../../interfaces/reparacion.interface';

@Component({
  selector: 'app-lista-reparaciones',
  templateUrl: './lista-reparaciones.component.html',
  styleUrls: ['./lista-reparaciones.component.css']
})
export class ListaReparacionesComponent implements OnInit, OnDestroy {

  reparaciones:Reparacion[] = [];
  
  @Input() actualizar!:Observable<void>;  

  private eventsSubscription: any

  constructor(private reparacionesService:ReparacionesService) { }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.eventsSubscription = this.actualizar.subscribe(() => this.actualizarDatos())
    this.reparacionesService.getReparaciones().subscribe(
      (reparaciones)=>{
        this.reparaciones = reparaciones;
      }
    )
  }

  actualizarDatos() {
    this.reparacionesService.getReparaciones().subscribe(reparaciones => {
      this.reparaciones = reparaciones;
      // this.reparacionesFiltradas = this.reparaciones;
    });
  }


}
