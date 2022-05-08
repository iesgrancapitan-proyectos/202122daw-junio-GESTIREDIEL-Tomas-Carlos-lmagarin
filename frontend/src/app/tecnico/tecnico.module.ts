import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnicoRoutingModule } from './tecnico-routing.module';
import { TecnicoComponent } from './pages/tecnico/tecnico.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    TecnicoComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    TecnicoRoutingModule
  ]
})
export class TecnicoModule { }
