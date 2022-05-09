import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Proveedor } from 'src/app/interfaces/proveedor.interface';
import Swal from 'sweetalert2';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-proveedores-form',
  templateUrl: './proveedores-form.component.html',
  styleUrls: ['./proveedores-form.component.css']
})
export class ProveedoresFormComponent implements OnInit {

  @Output() proveedor!: Proveedor;

  editForm!: boolean;
  public form!: FormGroup;
  msgError!: string;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProveedoresFormComponent>,
    private proveedoresService: ProveedoresService) { }

  ngOnInit(): void {
    this.editForm = this.proveedor != null;

    
    if (this.editForm) {
      this.form = this.fb.group({
        nombre_comercial: [this.proveedor.nombre_comercial, [Validators.required, Validators.maxLength(45)]],
        nombre_fiscal: [this.proveedor.nombre_fiscal, [Validators.required, Validators.maxLength(45)]],
      }) 
    }else{
      this.form = this.fb.group({
        nombre_comercial: ['', [Validators.required, Validators.maxLength(45)]],
        nombre_fiscal: ['', [Validators.required, Validators.maxLength(45)]],
      })
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.editForm) {
        this.proveedoresService.editarProveedor(this.proveedor.id!, this.form.value).subscribe({
          next: (res) =>
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Proveedor actualizado correctamente',
              showConfirmButton: false,
              timer: 3000
            }).then(() => {
              this.dialogRef.close();
            })
          ,
          error: (err) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: err.error.msg,
              showConfirmButton: false,
              timer: 2000
            })
          }
        })
      } else {

        this.proveedoresService.crearProveedor(this.form.value).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Proveedor creado correctamente',
              showConfirmButton: false,
              timer: 3000
            }).then(() => {
              this.dialogRef.close();
            })
          },
          error: (err) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: err.error.msg,
              showConfirmButton: false,
              timer: 2000
            })
          }
        })
      }
    }
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
