import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaReparacionesComponent } from './components/lista-reparaciones/lista-reparaciones.component';
import { ReparacionExpandComponent } from './components/reparacion-expand/reparacion-expand.component';
import { MaterialModule } from '../material/material.module';
import { ReparacionClienteComponent } from './components/reparacion-cliente/reparacion-cliente.component';
import { FiltroComponent } from './components/filtro/filtro.component';




@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    PerfilComponent,
    ReparacionExpandComponent,
    ListaReparacionesComponent,
    ReparacionClienteComponent,
    FiltroComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ListaReparacionesComponent,
    PerfilComponent,
    ReparacionClienteComponent
  ]
})
export class SharedModule { }
