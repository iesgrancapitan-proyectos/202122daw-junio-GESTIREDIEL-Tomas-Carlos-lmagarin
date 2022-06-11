import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Articulo } from '../../../interfaces/articulo.interface';
import { ArticulosService } from '../../services/articulos.service';
import { Proveedor } from '../../../interfaces/proveedor.interface';
import { ProveedoresService } from '../../services/proveedores.service';
import Swal from 'sweetalert2';
import { EntradaArticulo } from 'src/app/interfaces/entradaArticulo.interface';

@Component({
  selector: 'app-entrada-articulo-form',
  templateUrl: './entrada-articulo-form.component.html',
  styleUrls: ['./entrada-articulo-form.component.css']
})
export class EntradaArticuloFormComponent implements OnInit {

  @Output() articulo!: Articulo;
  proveedores: Proveedor[] = [];

  public form!: FormGroup;
  msgError!: string;

  constructor(private articulosService: ArticulosService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EntradaArticuloFormComponent>,
    public proveedoresService: ProveedoresService) { }

  ngOnInit(): void {


    this.proveedoresService.getProveedores().subscribe({ next: (proveedores) => { this.proveedores = proveedores } })


    this.form = this.fb.group({
      cantidad: ['', [Validators.required]],
      proveedor: ['', [Validators.required]]
    })

  }

  submit() {
    if (this.form.valid) {
      const id_articulo = this.articulo.id!;
      const id_proveedor = this.form.value.proveedor;
      const cantidad = this.form.value.cantidad;
      const entrada: EntradaArticulo = { id_articulo, id_proveedor, cantidad };
      this.articulosService.nuevaEntrada(entrada).subscribe({
        next: (res) => {
          if (res.ok) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Entrada de articulo creada correctamente',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.dialogRef.close();
            })
          }},
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

  closeDialog(): void {
    this.dialogRef.close();
  }

}
