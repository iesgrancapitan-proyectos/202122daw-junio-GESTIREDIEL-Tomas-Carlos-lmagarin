import { Component, OnInit } from '@angular/core';
import { TecnicosService } from '../../../shared/services/tecnicos.service';
import { Tecnico } from '../../../interfaces/tecnico';
import { MatDialog } from '@angular/material/dialog';
import { TecnicoFormComponent } from '../../components/tecnico-form/tecnico-form.component';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css']
})
export class TecnicosComponent implements OnInit {

  tecnicos: Tecnico[] = [];

  constructor(private tecnicosService:TecnicosService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.aztualizarTecnicos();
  }

  agregarDialog(){
    const dialogRef = this.dialog.open(TecnicoFormComponent,{disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.aztualizarTecnicos();
      }
    });
  }

  aztualizarTecnicos(){
    this.tecnicosService.getTecnicos().subscribe(tecnicos => this.tecnicos = tecnicos);
  }

}
