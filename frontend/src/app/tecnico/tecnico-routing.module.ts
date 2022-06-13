import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TecnicoComponent } from './pages/tecnico/tecnico.component';

const routes: Routes = [
  {
    path: '',
    component: TecnicoComponent,
    children: [
      { path: '', component: TecnicoComponent },
      { path: '**', redirectTo: '' }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicoRoutingModule { }
