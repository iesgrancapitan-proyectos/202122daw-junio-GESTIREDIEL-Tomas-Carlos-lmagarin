import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { TableCrudComponent } from './components/table-crud/table-crud.component';

import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ClientesComponent,
    TableCrudComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminDashboardRoutingModule,
    DataTablesModule
  ]
})
export class AdminDashboardModule { }
