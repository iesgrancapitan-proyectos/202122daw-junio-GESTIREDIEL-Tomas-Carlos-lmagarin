import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Articulo } from '../../../interfaces/articulo.interface';
import { ArticulosService } from '../../services/articulos.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../../interfaces/categoria.interface';
import { ProveedoresService } from '../../services/proveedores.service';
import { Proveedor } from '../../../interfaces/proveedor.interface';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {

  @Output() articulo!: Articulo;
  categorias:Categoria[] = [];
  proveedores:Proveedor[] = [];

  editForm!:boolean;

  public form!: FormGroup;

  constructor(private articulosService: ArticulosService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ArticuloFormComponent>,
    public categoriaService:CategoriaService,
    public proveedoresService:ProveedoresService) { }

  ngOnInit(): void {
    this.editForm = this.articulo != null;

    this.categoriaService.getCategorias().subscribe(
      {
        next: (res) => {
          this.categorias = res;
        }
      }
    )

    if (!this.editForm) {
      console.log("Creando articulo");
      this.proveedoresService.getProveedores().subscribe(
        {
          next: (res) => {
            this.proveedores = res;
          }
        })

    }else{
      console.log("Editando articulo");
    }

    this.form = this.fb.group({
      descripcion:[this.articulo.descripcion, [Validators.required]],
      referencia: [this.articulo.referencia, [Validators.required]],
      precio_coste: [this.articulo.precio_coste, [Validators.required]],
      precio_venta: [this.articulo.precio_venta, [Validators.required]],
      id_categoria: [this.articulo.id_categoria, [Validators.required]],
    })
  }

  editar() {
    this.articulosService.editarArticulo(this.articulo.id!, this.form.value).subscribe(
      {
        next: (res) => {
          this.dialogRef.close();
        },
        error: (err) => {
          alert(err.msg);
        }
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}