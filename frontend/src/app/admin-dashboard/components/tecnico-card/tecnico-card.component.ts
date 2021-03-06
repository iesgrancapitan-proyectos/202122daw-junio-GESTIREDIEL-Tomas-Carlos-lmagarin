import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Tecnico } from '../../../interfaces/tecnico.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { TecnicoFormComponent } from '../tecnico-form/tecnico-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-card',
  templateUrl: './tecnico-card.component.html',
  styleUrls: ['./tecnico-card.component.css']
})
export class TecnicoCardComponent implements OnInit {

  @Input() tecnico!: Tecnico;
  @Output() 
  aztualizarTecnicos: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor( private authService: AuthService,public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
    
  }

  editar($event:any){
    $event.stopPropagation()
    const dialogRef = this.dialog.open(TecnicoFormComponent,{disableClose: true});
    dialogRef.componentInstance.tecnico = this.tecnico;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.aztualizarTecnicos.emit(true);
      }
    });
  }

  borrar($event:any){
    $event.stopPropagation()
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estas a punto de boorar a " + this.tecnico.nombre + " y todos sus datos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
  }).then((result) => {
      if (result.isConfirmed) {
          this.authService.borrarUsuario(this.tecnico.id_usuario!).subscribe(
            {complete: () => {
              this.aztualizarTecnicos.emit(true);
            }}
          );
          
      }
  })
  }
  navigateToReparaciones(){
    this.router.navigate(['/dashboard/reparaciones'], {state: {tecnico: this.tecnico}});
  }

}
