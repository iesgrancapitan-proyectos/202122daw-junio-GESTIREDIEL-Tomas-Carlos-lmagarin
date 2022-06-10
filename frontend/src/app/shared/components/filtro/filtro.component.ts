import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatMenuTrigger } from '@angular/material/menu';
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

  constructor() { }

  ngOnInit(): void {
  }

  filtrar(event:any,value? : string | Tecnico){
    if (this.tecnicos) {
      this.filtrarEvent.emit({
        tecnico: value,
        checked: event.checked
      })
    }else if(this.estados){
      this.filtrarEvent.emit({
        estado: value,
        checked: event.checked
      })
    }
  }

}
