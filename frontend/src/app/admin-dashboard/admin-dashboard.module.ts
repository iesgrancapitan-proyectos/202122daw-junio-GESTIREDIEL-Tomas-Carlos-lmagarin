import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { TableCrudComponent } from './components/table-crud/table-crud.component';

import { DataTablesModule } from "angular-datatables";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ClientesComponent,
    TableCrudComponent,
    EditFormComponent
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
