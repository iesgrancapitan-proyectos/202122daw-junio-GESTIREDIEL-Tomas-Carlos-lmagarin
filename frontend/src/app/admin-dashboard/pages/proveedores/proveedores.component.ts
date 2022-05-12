import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../interfaces/proveedor.interface';
import { ProveedoresService } from '../../services/proveedores.service';
import { ProveedoresFormComponent } from '../../components/proveedores-form/proveedores-form.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  displayedColumns: string[] = [
    'nombre_comercial',
    'nombre_fiscal',
    'cif',
    'telefono',
    'email',
    'acciones'
  ];
  dataSource!: MatTableDataSource<Proveedor>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private proveedoresService: ProveedoresService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getArticulos()
  }

  private getArticulos(): void {
    this.proveedoresService.getProveedores().subscribe(
      (proveedores: Proveedor[]) => {
        this.dataSource = new MatTableDataSource(proveedores);
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

  edit(proveedor: Proveedor): void {
    const dialogRef = this.dialog.open(ProveedoresFormComponent, { height:'600px',width:'500px',  disableClose: true });
    dialogRef.componentInstance.proveedor = proveedor;
    dialogRef.afterClosed().subscribe(result => {
      this.getArticulos()
    });
  }

  add() {
    const dialogRef = this.dialog.open(ProveedoresFormComponent, { height:'600px',width:'500px', disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      this.getArticulos()
    });
  }

  delete(proveedor: Proveedor): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres eliminar el proveedor ${proveedor.nombre_comercial}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.proveedoresService.borrarProveedor(proveedor.id!).subscribe(
          () => {
            this.getArticulos()
          }
        );

        Swal.fire({
          title: 'Eliminado',
          text: `El proveedor ${proveedor.nombre_comercial} ha sido eliminado`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }

    })
  };

}
