import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { ClientesComponent } from './pages/clientes/clientes.component';

import { DataTablesModule } from "angular-datatables";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { EditFormComponent } from './components/edit-cliente-form/edit-cliente-form.component';
import { TecnicosComponent } from './pages/tecnicos/tecnicos.component';
import { TecnicoCardComponent } from './components/tecnico-card/tecnico-card.component';
import { TecnicoFormComponent } from './components/tecnico-form/tecnico-form.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ArticuloFormComponent } from './components/articulo-form/articulo-form.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ClientesComponent,
    EditFormComponent,
    TecnicosComponent,
    TecnicoCardComponent,
    TecnicoFormComponent,
    ArticulosComponent,
    ProveedoresComponent,
    ArticuloFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminDashboardRoutingModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class AdminDashboardModule { }
