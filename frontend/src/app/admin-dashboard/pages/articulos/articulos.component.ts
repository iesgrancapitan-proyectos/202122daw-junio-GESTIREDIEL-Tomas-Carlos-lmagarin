import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Articulo } from '../../../interfaces/articulo.interface';
import { ArticulosService } from '../../services/articulos.service';
import { ArticuloFormComponent } from '../../components/articulo-form/articulo-form.component';
import { EntradaArticuloFormComponent } from '../../components/entrada-articulo-form/entrada-articulo-form.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { ProveedoresService } from '../../services/proveedores.service';
import { Proveedor } from 'src/app/interfaces/proveedor.interface';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[3]);

  displayedColumns: string[] = [
    'descripcion',
    'referencia',
    'precio_coste',
    'precio_venta',
    'categoria',
    'stock',
    'acciones'
  ];
  dataSource!: MatTableDataSource<Articulo>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  proveedores: Proveedor[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  historyProveedor!: Proveedor;

  constructor(private articulosService: ArticulosService,
    public dialog: MatDialog,
    private proveedoresService:ProveedoresService) { }

  ngOnInit(): void {

    this.historyProveedor = history.state.proveedor ? history.state.proveedor.id : '';

    this.articulosService.getArticulos().subscribe(
      (articulos: Articulo[]) => {
        this.dataSource = new MatTableDataSource(articulos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
        if(history.state.proveedor){
          this.filtrarPorProveedor(history.state.proveedor.id)
        }
      });

    this.getArticulos()

    this.proveedoresService.getProveedores().subscribe(
      (proveedores: Proveedor[]) => {
        this.proveedores = proveedores
      });
  }

  private getArticulos(): void {

    this.articulosService.getArticulos().subscribe(
      (articulos: Articulo[]) => {
        this.dataSource = new MatTableDataSource(articulos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(articulo: Articulo): void {
    const dialogRef = this.dialog.open(ArticuloFormComponent, { disableClose: true });
    dialogRef.componentInstance.articulo = articulo;
    dialogRef.afterClosed().subscribe(result => {
      this.getArticulos()
    });
  }

  add() {
    const dialogRef = this.dialog.open(ArticuloFormComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      this.getArticulos()
    });
  }

  nuevaEntrada(articulo: Articulo) {
    const dialogRef = this.dialog.open(EntradaArticuloFormComponent, { disableClose: true });
    dialogRef.componentInstance.articulo = articulo;
    dialogRef.afterClosed().subscribe(result => {
      this.getArticulos()
    });
  }

  delete(articulo: Articulo): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar el artículo ${articulo.descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.articulosService.borrarArticulo(articulo.id!).subscribe(
          () => {
            this.getArticulos()
          }
        );

        Swal.fire({
          title: 'Eliminado',
          text: `El artículo ${articulo.descripcion} ha sido eliminado`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      }

    })
  };

  filtrarPorProveedor(id_proveedor: number) {
    if (id_proveedor) {
      this.articulosService.getArticulosByProveedor(id_proveedor).subscribe(
        (articulos: Articulo[]) => {
          this.dataSource = new MatTableDataSource(articulos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );  
    }else{
      this.getArticulos()
    }
  }
}
