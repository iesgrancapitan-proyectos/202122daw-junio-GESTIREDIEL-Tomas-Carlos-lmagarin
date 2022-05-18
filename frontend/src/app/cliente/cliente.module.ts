import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    ClienteComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
