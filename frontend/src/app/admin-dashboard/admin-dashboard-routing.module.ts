import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { TecnicosComponent } from './pages/tecnicos/tecnicos.component';
import { PerfilComponent } from '../shared/pages/perfil/perfil.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ReparacionesComponent } from './pages/reparaciones/reparaciones.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'clientes'    , component: ClientesComponent },
      { path: 'tecnicos'    , component: TecnicosComponent },
      { path: 'articulos'   , component: ArticulosComponent },
      { path: 'proveedores' , component: ProveedoresComponent },
      { path: 'perfil'      ,component:  PerfilComponent},
      { path: 'reparaciones'      ,component:  ReparacionesComponent},
      { path: '**', redirectTo: '' }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
