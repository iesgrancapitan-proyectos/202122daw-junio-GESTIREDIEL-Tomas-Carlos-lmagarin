import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnicoRoutingModule } from './tecnico-routing.module';
import { TecnicoComponent } from './pages/tecnico/tecnico.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TecnicoComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    TecnicoRoutingModule,
    SharedModule
  ]
})
export class TecnicoModule { }
