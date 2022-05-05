import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Articulo } from '../../../interfaces/articulo.interface';
import { ArticulosService } from '../../services/articulos.service';
import { ArticuloFormComponent } from '../../components/articulo-form/articulo-form.component';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private articulosService: ArticulosService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getArticulos()
    console.log(this.dataSource);
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

  add(){
    const dialogRef = this.dialog.open(ArticuloFormComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      this.getArticulos()
    });
  }

}