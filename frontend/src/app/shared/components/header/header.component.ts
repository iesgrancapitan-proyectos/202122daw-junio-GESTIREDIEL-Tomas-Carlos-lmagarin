import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Menus = [
    { title: "Dashboard", src: "Chart_fill", path: "/dashboard" },
    { title: "Clientes", src: "User", gap: true, path: "/dashboard/clientes" },
    { title: "Tecnicos", src: "User", path: "/dashboard/tecnicos" },
    { title: "Empresa", src: "Setting", path: "/dashboard/empresa" },
    { title: "Informes", src: "Chart", path: "/dashboard/informes" },
    // { title: "Facturas", src: "Folder", path: "/dashboard/facturas" },
    // { title: "Presupuestos", src: "Folder", path: "/dashboard/presupuestos" },
    { title: "Pedidos", src: "Folder", gap: true, path: "/dashboard/pedidos" },
    { title: "Devoluciones ", src: "Calendar", path: "/dashboard/devoluciones" },
    // { title: "Anticipos", src: "Folder", path: "/dashboard/anticipos" },
    { title: "Proveedores", src: "User", gap: true, path: "/dashboard/proveedores" },
    { title: "Pedidos a proveedores", src: "Chart", path: "/dashboard/proveedores/pedidos" },
    // { title: "Facturas a proveedores", src: "Chart", path: "/dashboard/proveedores/facturas" },
    { title: "Articulos ", src: "Folder", gap: true, path: "/dashboard/articulos" },
    // { title: "Setting", src: "Setting", path: "/setting" }
  ];

  open: boolean = true;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public toogleOpen(open: boolean) {
    this.open = open;
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
