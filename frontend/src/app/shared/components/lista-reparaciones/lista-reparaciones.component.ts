import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReparacionesService } from '../../../admin-dashboard/services/reparaciones.service';
import { Reparacion } from '../../../interfaces/reparacion.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-lista-reparaciones',
  templateUrl: './lista-reparaciones.component.html',
  styleUrls: ['./lista-reparaciones.component.css']
})
export class ListaReparacionesComponent implements OnInit, OnDestroy {

  reparaciones:Reparacion[] = [];

  @Input() actualizar!:Observable<void>;

  private eventsSubscription: any

  constructor(private reparacionesService:ReparacionesService,private authService:AuthService) { }

  ngOnDestroy(): void {
    if(this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
    // this.eventsSubscription.unsubscribe()
  }

  ngOnInit(): void {
    if(this.actualizar) {
      this.eventsSubscription = this.actualizar.subscribe(() => {
        this.actualizarDatos()
      })
    }
    // this.eventsSubscription = this.actualizar.subscribe(() => this.actualizarDatos())
    this.reparacionesService.getReparaciones().subscribe(
      (reparaciones)=>{
        this.reparaciones = reparaciones;
      }
    )
    this.getReparacionesClient();
  }

  actualizarDatos() {
    this.reparacionesService.getReparaciones().subscribe(reparaciones => {
      this.reparaciones = reparaciones;
      // this.reparacionesFiltradas = this.reparaciones;
    });
  }

  getReparacionesClient(){
    let id=this.authService.usuario.uid;
    this.reparacionesService.getReparacionesPorCliente(id!).subscribe({
      next: (reparaciones)=>{
        console.log(reparaciones)
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }


}
