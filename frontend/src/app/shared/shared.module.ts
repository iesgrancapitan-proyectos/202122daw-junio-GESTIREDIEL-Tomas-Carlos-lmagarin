import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    PerfilComponent
  ]
})
export class SharedModule { }
