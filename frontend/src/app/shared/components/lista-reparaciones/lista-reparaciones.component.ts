import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reparacion } from '../../../interfaces/reparacion.interface';
import { ReparacionesService } from '../../services/reparaciones.service';
import { Tecnico } from '../../../interfaces/tecnico.interface';
import { TecnicosService } from '../../services/tecnicos.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-reparaciones',
  templateUrl: './lista-reparaciones.component.html',
  styleUrls: ['./lista-reparaciones.component.css']
})
export class ListaReparacionesComponent implements OnInit, OnDestroy {

  reparaciones: Reparacion[] = [];
  reparacionesFiltradas: Reparacion[] = [];
  reparacionesPaginada: Reparacion[] = [];
  tecnicos: Tecnico[] = []

  @Input() actualizar!: Observable<void>;
  @Input() UidTecnico!: string;

  estados: string[] = ['Pendiente', 'En reparación', 'Terminada', 'Cancelada']
  estadosFiltro: string[] = []
  tecnicosFiltro: number[] = []

  private eventsSubscription: any

  // MatPaginator Inputs
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent!: PageEvent

  history!:Tecnico

  constructor(private reparacionesService: ReparacionesService,
    private tecnicosService: TecnicosService) { }

  ngOnDestroy(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.history = history.state.tecnico

    this.tecnicosService.getTecnicos().subscribe({
      next: (tecnicos: Tecnico[]) => {
        this.tecnicos = tecnicos
      }
    })

    if (this.actualizar) {
      this.eventsSubscription = this.actualizar.subscribe(() => {
        this.actualizarDatos()
      })
    }

    if (this.UidTecnico) {
      this.reparacionesService.getReparacionPorTecnico(this.UidTecnico).subscribe({
        next: (reparaciones: Reparacion[]) => {
          this.reparaciones = reparaciones
          this.pageEvent = {
            pageIndex: 0,
            pageSize: 5,
            length: reparaciones.length
          };
          this.reparacionesFiltradas = reparaciones
          this.reparacionesPaginada = this.reparacionesFiltradas.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize)
        }
      })
    } else {
      this.reparacionesService.getReparaciones().subscribe({
        next: (reparaciones: Reparacion[]) => {
          this.reparaciones = reparaciones
          this.pageEvent = {
            pageIndex: 0,
            pageSize: 5,
            length: reparaciones.length
          };
          this.reparacionesFiltradas = reparaciones
          this.reparacionesPaginada = this.reparacionesFiltradas.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize)
          if(history.state.tecnico){
            this.filtrar({tecnico: history.state.tecnico, checked: true})
          }
        }
      });
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  actualizarDatos() {
    if (this.UidTecnico) {
      this.reparacionesService.getReparacionPorTecnico(this.UidTecnico).subscribe({
        next: (reparaciones: Reparacion[]) => {
          this.reparaciones = reparaciones
          this.pageEvent = {
            pageIndex: 0,
            pageSize: 5,
            length: reparaciones.length
          };
          this.reparacionesFiltradas = reparaciones
          this.reparacionesPaginada = this.reparacionesFiltradas.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize)
        }
      })
    } else {
      this.reparacionesService.getReparaciones().subscribe({
        next: (reparaciones: Reparacion[]) => {
          this.reparaciones = reparaciones
          this.pageEvent = {
            pageIndex: 0,
            pageSize: 5,
            length: reparaciones.length
          };
          this.reparacionesFiltradas = reparaciones
          this.reparacionesPaginada = this.reparacionesFiltradas.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize)
        }
      });
    }
  }

  filtrar(event: any) {
    console.log(event);
    this.reparacionesFiltradas = this.reparaciones

    if (event.estado) {
      let { estado, checked } = event

      if (checked) {
        this.estadosFiltro.push(estado)
        if (this.tecnicosFiltro.length > 0) {
          this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.tecnicosFiltro.includes(reparacion.tecnico?.id!))
          this.reparacionesFiltradas = this.reparacionesFiltradas.filter(reparacion => this.estadosFiltro.includes(reparacion.estado!))
        } else {
          this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.estadosFiltro.includes(reparacion.estado!))
        }
      } else {
        this.estadosFiltro = this.estadosFiltro.filter(estadoAnterior => estadoAnterior !== estado)
        if(this.tecnicosFiltro.length > 0 && this.estadosFiltro.length == 0){
          this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.tecnicosFiltro.includes(reparacion.tecnico?.id!))
        }else if (this.tecnicosFiltro.length > 0 && this.estadosFiltro.length > 0) {
          this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.tecnicosFiltro.includes(reparacion.tecnico?.id!))
          this.reparacionesFiltradas = this.reparacionesFiltradas.filter(reparacion => this.estadosFiltro.includes(reparacion.estado!))
        } else if(this.tecnicosFiltro.length == 0 && this.estadosFiltro.length > 0) {
          this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.estadosFiltro.includes(reparacion.estado!))
        }
      }

    } else if (event.tecnico) {
      const { tecnico, checked } = event

      if (checked) {
        this.tecnicosFiltro.push(tecnico.id)
        if (this.estadosFiltro.length > 0) {
          this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.estadosFiltro.includes(reparacion.estado!))
          this.reparacionesFiltradas = this.reparacionesFiltradas.filter(reparacion => this.tecnicosFiltro.includes(reparacion.tecnico?.id!))  
        } else {
          this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.tecnicosFiltro.includes(reparacion.tecnico?.id!))  
        }
      } else {
        this.tecnicosFiltro = this.tecnicosFiltro.filter(estadoAnterior => estadoAnterior !== tecnico.id)

        if(this.estadosFiltro.length > 0 && this.tecnicosFiltro.length == 0){
          this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.estadosFiltro.includes(reparacion.estado!))
        }else if (this.estadosFiltro.length > 0 && this.tecnicosFiltro.length > 0) {
          this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.estadosFiltro.includes(reparacion.estado!))
          this.reparacionesFiltradas = this.reparacionesFiltradas.filter(reparacion => this.tecnicosFiltro.includes(reparacion.tecnico?.id!))  
        } else if(this.estadosFiltro.length == 0 && this.tecnicosFiltro.length > 0) {
          this.reparacionesFiltradas = this.reparaciones.filter(reparacion => this.tecnicosFiltro.includes(reparacion.tecnico?.id!))  
        } 

      }

    }
    this.reparacionesPaginada = this.reparacionesFiltradas.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize)

  }
  pageChanged(event: PageEvent){
    this.pageEvent = event
    this.reparacionesPaginada = this.reparacionesFiltradas.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize)
  }
}
