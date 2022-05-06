import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Articulo } from '../../../interfaces/articulo.interface';
import { ArticulosService } from '../../services/articulos.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../../interfaces/categoria.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {

  @Output() articulo!: Articulo;
  categorias: Categoria[] = [];

  editForm!: boolean;
  articuloIsServicio!: boolean
  createNewCategoria: boolean = false
  idCategoria!: number;

  public form!: FormGroup;
  msgError!: string;

  constructor(private articulosService: ArticulosService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ArticuloFormComponent>,
    public categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.editForm = this.articulo != null;

    this.categoriaService.getCategorias().subscribe({ next: (res) => { console.log(res); this.categorias = res } })


    if (this.editForm) {
      this.form = this.fb.group({
        categoria: [this.articulo.id_categoria + "-" + this.articulo.categoria, [Validators.required]],
        descripcion: [this.articulo.descripcion, [Validators.required, Validators.maxLength(45)]],
        referencia: [this.articulo.referencia, [Validators.required, Validators.maxLength(45)]],
        precio_coste: [this.articulo.precio_coste, [Validators.required]],
        precio_venta: [this.articulo.precio_venta, [Validators.required]]
      })
    } else {
      this.form = this.fb.group({
        categoria: ['', [Validators.required]],
        descripcion: ['', [Validators.required, Validators.maxLength(45)]],
        referencia: ['', [Validators.required, Validators.maxLength(45)]],
        precio_coste: ['', [Validators.required]],
        precio_venta: ['', [Validators.required]]
      })
    }



  }

  submit() {
    if (this.form.valid) {
      if (this.editForm) {
        if (this.createNewCategoria) {
          this.categoriaService.createCategoria({ nombre: this.form.controls['categoria'].value }).subscribe({
            next: (res) => {
              this.idCategoria = res.id!;
            },
            error: (err) => {
              this.msgError = err.msg;
            },
            complete: () => {
              this.editarArticulo();
            }
          })
        } else {
          this.idCategoria = parseInt(this.form.controls['categoria'].value.split("-")[0]);
          this.editarArticulo();
        }
      } else {
        if (this.articuloIsServicio) {
          if (this.createNewCategoria) {
            this.categoriaService.createCategoria({ nombre: this.form.controls['categoria'].value }).subscribe({
              next: (res) => {
                this.idCategoria = res.id!;
              },
              error: (err) => {
                this.msgError = err.msg;
              },
              complete: () => {
                this.crearArticulo();
              }
            })
          } else {
            this.idCategoria = parseInt(this.form.controls['categoria'].value.split("-")[0]);
            this.crearArticulo();
          }

        } else {
          this.articulosService.articuloExiste(this.form.controls['referencia'].value).subscribe({
            next: (res) => {
              if (this.createNewCategoria) {
                this.categoriaService.createCategoria({ nombre: this.form.controls['categoria'].value }).subscribe({
                  next: (res) => {
                    this.idCategoria = res.id!;
                  },
                  error: (err) => {
                    this.msgError = err.msg;
                  },
                  complete: () => {
                    this.crearArticulo();
                  }
                })
              } else {
                this.idCategoria = parseInt(this.form.controls['categoria'].value.split("-")[0]);
                this.crearArticulo();
              }
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
  }


  crearArticulo() {

    let articulo: Articulo = {
      descripcion: this.form.controls['descripcion'].value,
      precio_coste: this.form.controls['precio_coste'].value,
      precio_venta: this.form.controls['precio_venta'].value,
      id_categoria: this.idCategoria,
      referencia: this.form.controls['referencia'].value ? this.form.controls['referencia'].value : null
    };

    this.articulosService.crearArticulo(articulo).subscribe(
      {
        next: (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Articulo creado correctamente',
            showConfirmButton: false,
            timer: 3000
          }).then(() => {
            this.dialogRef.close();
          })
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }


  editarArticulo() {

    let articulo: Articulo = {
      descripcion: this.form.controls['descripcion'].value,
      precio_coste: this.form.controls['precio_coste'].value,
      precio_venta: this.form.controls['precio_venta'].value,
      id_categoria: this.idCategoria,
      referencia: this.form.controls['referencia'].value ? this.form.controls['referencia'].value : null
    };

    this.articulosService.editarArticulo(this.articulo.id!, articulo).subscribe(
      {
        next: (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Articulo actualizado correctamente',
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
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  changeCategory() {
    const categoria = this.form.controls['categoria'].value.split("-")[1];

    this.createNewCategoria = false;
    if (categoria === 'Servicios') {
      this.articuloIsServicio = true;
      this.form.controls['referencia'].disable();
      this.form.controls['precio_coste'].setValue(0);
    } else {
      this.articuloIsServicio = false;
      this.form.controls['referencia'].enable();
      this.form.controls['precio_coste'].setValue("");
    }
  }

  createNewCategoriaBtn() {
    this.createNewCategoria = true;
    this.articuloIsServicio = false;
    this.form.controls['precio_coste'].setValue("");
    this.form.controls['categoria'].setValue("");
  }

}