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
        { title: "Clientes", src: "User", path: "/dashboard/clientes" },
        { title: "Tecnicos", src: "User", path: "/dashboard/tecnicos" },
        { title: "Informes", src: "Chart", path: "/dashboard/informes" }
      ]
    },
    // { title: "Facturas", src: "Folder", path: "/dashboard/facturas" },
    // { title: "Presupuestos", src: "Folder", path: "/dashboard/presupuestos" },
    { title: "Reparaciones",icon:"bx-folder-minus", src: "Folder", path: "/dashboard/pedidos" },
    { title: "Devoluciones ",icon:"bx-refresh", src: "Calendar", path: "/dashboard/devoluciones" },

    // { title: "Anticipos", src: "Folder", path: "/dashboard/anticipos" },

    {
      title: "Proveedores",icon:"bx-package",
      items: [
        { title: "Proveedores", src: "User", path: "/dashboard/proveedores" },
        { title: "Pedidos a proveedores", src: "Chart", path: "/dashboard/proveedores/pedidos" }
      ]
    },
    // { title: "Facturas a proveedores", src: "Chart", path: "/dashboard/proveedores/facturas" },
    { title: "Articulos ",icon:"bx-mobile-alt", src: "Folder", path: "/dashboard/articulos" },
    // { title: "Setting", src: "Setting", path: "/setting" }
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
