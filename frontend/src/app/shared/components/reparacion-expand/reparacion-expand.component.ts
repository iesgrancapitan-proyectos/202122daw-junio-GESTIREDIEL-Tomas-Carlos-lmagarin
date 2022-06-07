import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ArticulosService } from '../../../admin-dashboard/services/articulos.service';
import { Articulo } from '../../../interfaces/articulo.interface';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ReparacionesService } from '../../services/reparaciones.service';

@Component({
  selector: 'app-reparacion-expand',
  templateUrl: './reparacion-expand.component.html',
  styleUrls: ['./reparacion-expand.component.css']
})
export class ReparacionExpandComponent implements OnInit {

  @Input() reparacion: any;
  @Input() forTecnico!:boolean;

  @Output() onBorrar = new EventEmitter();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  articulosCtrl = new FormControl();
  filteredArticulos!: Observable<Articulo[]>;
  allArticulos: Articulo[] = [];
  editReparacionFrom!:FormGroup
  estados = [
    'Pendiente',
    'En reparación',
    'Terminada',
    'Cancelada'
  ];


  @ViewChild('articuloInput') articuloInput!: ElementRef<HTMLInputElement>;

  constructor(private serviceReparacion:ReparacionesService,
              private articulosService:ArticulosService,
              private fb:FormBuilder ) { }

  ngOnInit(): void {

    this.editReparacionFrom = this.fb.group({
      averia: [this.reparacion.averia],
      accesorios: [this.reparacion.accesorios],
      observaciones: [this.reparacion.observaciones]
    })

    this.updateArticulosReparacion()

    this.articulosService.getArticulos().subscribe({
      next: (articulos) => {
        this.allArticulos = articulos;
        this.filteredArticulos = this.articulosCtrl.valueChanges.pipe(
          startWith(null),
          map((articulo) => (articulo ? this._filter(articulo) : this.allArticulos.slice())),
        );
      }
    })

    
  }

  private updateArticulosReparacion() {
    this.serviceReparacion.getArticulosReparacion(this.reparacion.id).subscribe({
      next: (articulos:Articulo[]) => {
        this.reparacion.articulos = articulos;
      }
    })
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
      inputAttributes: {
        'aria-label': 'Escribe tu mensaje aquí'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar'
    });
    if (mensaje) {
      this.serviceReparacion.sendMail(this.reparacion.cliente.email,mensaje).subscribe(
        (data) => {
          Swal.fire('Enviado', 'El correo ha sido enviado', 'success');
        }
      )
    }
  }

  remove(articulo: Articulo): void {
    const index = this.reparacion.articulos.indexOf(articulo);

    this.serviceReparacion.deleteArticulo(this.reparacion.id,articulo.id!).subscribe({
      next: () => {
        if (index >= 0 && articulo.cantidad == 1) {
          this.reparacion.articulos.splice(index, 1);
        }
        this.updateArticulosReparacion();
        
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    this.serviceReparacion.addArticulo(this.reparacion.id,event.option.value.id!).subscribe({
      next: () => {
        if (!this.reparacion.articulos.find((articulo: { id: any; }) => articulo.id === event.option.value.id)) {
          this.reparacion.articulos.push(event.option.value);
        }
        this.updateArticulosReparacion();
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
    this.articuloInput.nativeElement.value = '';
    this.articulosCtrl.setValue(null);
  }

  private _filter(value: string): Articulo[] {
    const filterValue = value

    return this.allArticulos.filter(articulo => articulo.descripcion.toLowerCase().includes(filterValue));
  }

  public editReparacion(){
    console.log("editReparacion");
    this.serviceReparacion.editarReparacion(this.reparacion.id,this.editReparacionFrom.value).subscribe({
      next: () => {
        Swal.fire('Editado', 'La reparación ha sido editada', 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  changeState(newState: string) {

    this.serviceReparacion.changeState(this.reparacion.id,newState).subscribe({
      next: () => {
        Swal.fire('Editado', 'El estado ha sido editado', 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

}
