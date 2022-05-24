import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ReparacionesService } from '../../../admin-dashboard/services/reparaciones.service';
import { ArticulosService } from '../../../admin-dashboard/services/articulos.service';
import { Articulo } from '../../../interfaces/articulo.interface';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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

  @ViewChild('articuloInput') articuloInput!: ElementRef<HTMLInputElement>;

  constructor(private serviceReparacion:ReparacionesService,
              private articulosService:ArticulosService ) { }

  ngOnInit(): void {
    console.log(this.reparacion);
    this.articulosService.getArticulos().subscribe({
      next: (articulos) => {
        this.allArticulos = articulos;
        this.filteredArticulos = this.articulosCtrl.valueChanges.pipe(
          startWith(null),
          map((articulo: Articulo | null) => (articulo ? this._filter(articulo) : this.allArticulos.slice())),
        );
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our artículo
    if (value) {
      this.reparacion.articulos.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.articulosCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.reparacion.articulos.indexOf(fruit);

    if (index >= 0) {
      this.reparacion.articulos.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.reparacion.articulos.push(event.option.viewValue);
    this.articuloInput.nativeElement.value = '';
    this.articulosCtrl.setValue(null);
  }

  private _filter(value: Articulo): Articulo[] {
    const filterValue = value.descripcion.toLowerCase();

    return this.allArticulos.filter(articulo => articulo.descripcion.toLowerCase().includes(filterValue));
  }

}
