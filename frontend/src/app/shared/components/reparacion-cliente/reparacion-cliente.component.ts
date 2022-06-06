import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Reparacion } from 'src/app/interfaces/reparacion.interface';
import { ClientesService } from '../../services/clientes.service';
import { ReparacionesService } from '../../services/reparaciones.service';

@Component({
  selector: 'app-reparacion-cliente',
  templateUrl: './reparacion-cliente.component.html',
  styleUrls: ['./reparacion-cliente.component.css']
})
export class ReparacionClienteComponent implements OnInit {

  constructor(private reparacionServ:ReparacionesService,private userService: AuthService) { }

  reparaciones:any = [];

  ngOnInit(): void {
    this.reparacionServ.getReparacion(this.userService.usuario.uid).subscribe(
      {
        next: (reparaciones:any)=>{
          this.reparaciones = reparaciones.data;
        },
        error: (error)=>{
          console.log(error);
        }
      }
    );
  }

}
