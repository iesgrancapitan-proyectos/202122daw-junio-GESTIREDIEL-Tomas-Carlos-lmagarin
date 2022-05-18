import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditFormComponent } from './components/edit-cliente-form/edit-cliente-form.component';
import { TecnicosComponent } from './pages/tecnicos/tecnicos.component';
import { TecnicoCardComponent } from './components/tecnico-card/tecnico-card.component';
import { TecnicoFormComponent } from './components/tecnico-form/tecnico-form.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ArticuloFormComponent } from './components/articulo-form/articulo-form.component';
import { EntradaArticuloFormComponent } from './components/entrada-articulo-form/entrada-articulo-form.component';
import { ProveedoresFormComponent } from './components/proveedores-form/proveedores-form.component';
import { CreateClienteFormComponent } from './components/create-cliente-form/create-cliente-form.component';
import { ReparacionesComponent } from './pages/reparaciones/reparaciones.component';
import { MaterialModule } from '../material/material.module';
import { CreateReparacionStepperComponent } from './components/create-reparacion-stepper/create-reparacion-stepper.component';
import { CreateDispositivoFormComponent } from './components/create-dispositivo-form/create-dispositivo-form.component';
import { CreateReparacionFormComponent } from './components/create-reparacion-form/create-reparacion-form.component';


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
    ArticuloFormComponent,
    EntradaArticuloFormComponent,
    ProveedoresFormComponent,
    CreateClienteFormComponent,
    ReparacionesComponent,
    CreateReparacionStepperComponent,
    CreateDispositivoFormComponent,
    CreateReparacionFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminDashboardRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class AdminDashboardModule { }
