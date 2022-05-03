import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./admin-dashboard/admin-dashboard-routing.module').then(m => m.AdminDashboardRoutingModule),
      canActivate: [ValidarTokenGuard],//ValidarAdminGuard
      canLoad: [ValidarTokenGuard]
    },
    {
      path: 'tecnico',
      loadChildren: () => import('./tecnico/tecnico.module').then(m => m.TecnicoModule),
      canActivate: [ValidarTokenGuard],
      canLoad: [ValidarTokenGuard]
    },
    {
      path: 'cliente',
      loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
      canActivate: [ValidarTokenGuard],
      canLoad: [ValidarTokenGuard]
    },
    {
      path: '**',
      redirectTo: 'auth'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
