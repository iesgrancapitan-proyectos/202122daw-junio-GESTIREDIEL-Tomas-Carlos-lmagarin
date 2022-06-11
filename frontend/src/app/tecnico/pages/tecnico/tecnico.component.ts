import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../interfaces/tecnico.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/AuthResponse.interface';
import { TecnicosService } from '../../../shared/services/tecnicos.service';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.css']
})
export class TecnicoComponent implements OnInit {

  tecnico!:Tecnico
  usuario!:Usuario

  constructor(private authService:AuthService,
              private tecnicosService:TecnicosService) { }

  ngOnInit(): void {
   
    this.usuario = this.authService.usuario

    this.tecnicosService.getTecnicoByUid(this.authService.usuario.uid).subscribe({
      next: (tecnico:Tecnico) => {
        this.tecnico = tecnico
      }
    })
  }

}
