import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  Menu = [
    { title: "Dashboard",icon:"bx-home-alt-2", src: "Chart_fill", path: "/dashboard" },
    {
      title: "Gestión",icon:"bx-briefcase-alt",
      items: [
        { title: "Clientes", path: "/dashboard/clientes" },
        { title: "Técnicos", path: "/dashboard/tecnicos" },
        { title: "Informes", path: "/dashboard/informes" }
      ]
    },
    { title: "Ventas",icon:"bx-dollar", path: "/dashboard/ventas" },
    { title: "Reparaciones",icon:"bx-folder-minus", path: "/dashboard/pedidos" },

    {
      title: "Artículos",icon:"bx-package",
      items: [
        { title: "Proveedores", path: "/dashboard/proveedores" },
        { title: "Artículos", path: "/dashboard/articulos" },
      ]
    },

  ];

  open: boolean = true;

  @ViewChild('sidebar')
  sidebar!: ElementRef;


  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  public arrowParent(e: HTMLElement) {
    e.offsetParent?.classList.toggle("showMenu");
  }

  public toogleSidebar() {
    this.sidebar?.nativeElement.classList.toggle("close");
    document.querySelector('app-sidebar')?.classList.toggle("close");
  }

  public logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estas a punto de cerrar sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    })
  }

}
