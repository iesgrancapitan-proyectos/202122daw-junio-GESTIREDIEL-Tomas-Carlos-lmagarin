import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TecnicosService } from '../../../shared/services/tecnicos.service';
import { Tecnico } from '../../../interfaces/tecnico.interface';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tecnico-form',
  templateUrl: './tecnico-form.component.html',
  styleUrls: ['./tecnico-form.component.css']
})
export class TecnicoFormComponent implements OnInit {

  @Output() tecnico!: Tecnico
  typeFormEditar:boolean = false;
  formError:string = ""

  public form!: FormGroup;

  constructor(private tecnicosService: TecnicosService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TecnicoFormComponent>) { }

  ngOnInit(): void {

    this.typeFormEditar = this.tecnico != null;
    if (this.typeFormEditar) {
      this.form = this.fb.group({
        username: [this.tecnico.username, [Validators.required]],
        email: [this.tecnico.email, [Validators.required, Validators.email]],
        nombre: [this.tecnico.nombre, [Validators.required]]
      })
    }else{
      this.form = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        nombre: ['', [Validators.required]]
      })
    }
  }

  editar() {
    this.tecnicosService.editarTecnico(this.tecnico.id_usuario!, this.form.value).subscribe(
      {
        next: (res) => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.formError = err.error.msg;
        }
      }
    )
  }

  agregar() {
    this.tecnicosService.createTecnico(this.form.value).subscribe(
      {
        next: (res) => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.formError = err.error.msg;
        }
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  visibility(field: string):string {
    if (this.form.controls[field].invalid && this.form.controls[field].touched) {
      return "visible";
    } else {
      return "hidden";
    }
  }

}
