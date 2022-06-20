import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReparacionesService } from 'src/app/shared/services/reparaciones.service';
import { ArticulosService } from '../../services/articulos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private serviceArticulos: ArticulosService,
    private serviceReparacion: ReparacionesService,
    private router: Router
  ) {}

  columnsNextReparaciones: string[] = [
    'averia',
    'estado',
    'fecha_creacion',
    'fecha_compromiso',
  ];
  nextReparaciones!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginatorNext!: MatPaginator;
  @ViewChild(MatSort) sortNext!: MatSort;

  columnsCountArts: string[] = [
    'count',
    'descripcion',
    'precio_venta'
  ];
  countArts!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginatorCount!: MatPaginator;
  @ViewChild(MatSort) sortCount!: MatSort;

  columnsArtsOrders: string[] = [
    'categoria',
    'descripcion',
    'precio_coste',
    'precio_venta'
  ];
  articulosOrder!: MatTableDataSource<any[]>;
  @ViewChild('articulosOrderPag') paginatorArtsOrder!: MatPaginator;
  @ViewChild(MatSort) sortArtsOrder!: MatSort;

  columnsTecnicos: string[] = [
    'nombre',
    'cantidad'
  ];
  reparacionesTecnicos!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginatorRepTecnico!: MatPaginator;
  @ViewChild(MatSort) sortRepTecnico!: MatSort;

  ngOnInit(): void {
    this.reparacionesSiguientes();
    this.countArticulos();
    this.getAllArticulosOrder();
    this.getReparacionesByTecnico();
  }

  private getReparacionesByTecnico():void{
    this.serviceReparacion.countReparacionesTecnicos().subscribe((reparaciones: any) => {
      this.reparacionesTecnicos = new MatTableDataSource(reparaciones);
      this.reparacionesTecnicos.paginator = this.paginatorRepTecnico;
      this.reparacionesTecnicos.sort = this.sortRepTecnico;
    });
  }

  private getAllArticulosOrder(): void {
    this.serviceArticulos.getArticulos().subscribe((articulos: any) => {
      let arts=articulos.slice(0,5);
      this.articulosOrder = new MatTableDataSource(arts);
      this.articulosOrder.paginator = this.paginatorArtsOrder;
      this.articulosOrder.sort = this.sortArtsOrder;
    });
  }

  private countArticulos():void{
    this.serviceArticulos.contarArticulos().subscribe((articulos: any) => {
      this.countArts = new MatTableDataSource(articulos);
      this.countArts.paginator = this.paginatorCount;
      this.countArts.sort = this.sortCount;
    })
  }

  private reparacionesSiguientes(): void {
    this.serviceReparacion.nextReparaciones().subscribe((reparaciones: any) => {
      reparaciones.forEach((reparacion: any) => {
        reparacion.fecha_creacion = reparacion.fecha_creacion.slice(0, 10);
        reparacion.fecha_compromiso = reparacion.fecha_compromiso.slice(0, 10);
      });
      this.nextReparaciones = new MatTableDataSource(reparaciones);
      this.nextReparaciones.paginator = this.paginatorNext;
      this.nextReparaciones.sort = this.sortNext;
    });
  }
}
