import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tecnico } from '../../../interfaces/tecnico.interface';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  @Input() estados!: string[];
  @Input() tecnicos!: Tecnico[];
  @Output() filtrarEvent = new EventEmitter<any>();
  @Input() fromTecnicoPage!: Tecnico

  constructor() { }

  ngOnInit(): void {

    if (this.fromTecnicoPage && this.tecnicos) {
      console.log(this.fromTecnicoPage);
      console.log(document.getElementsByClassName('tecnico-'+this.fromTecnicoPage.id));
    }
  }

  filtrar(event: any, value?: string | Tecnico) {
    if (this.tecnicos) {
      this.filtrarEvent.emit({
        tecnico: value,
        checked: event.checked
      })
    } else if (this.estados) {
      this.filtrarEvent.emit({
        estado: value,
        checked: event.checked
      })
    }
  }

}
