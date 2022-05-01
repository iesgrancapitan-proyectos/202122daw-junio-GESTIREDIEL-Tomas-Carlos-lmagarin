import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'app-table-crud',
    templateUrl: './table-crud.component.html',
    styleUrls: ['./table-crud.component.css'],
})
export class TableCrudComponent implements OnInit {

    displayedColumns: string[] = [
        'nombre',
        'email',
        'domicilio',
        'cp',
        'poblacion',
        'provincia',
        'persona_contacto',
        'registrado',
        'acciones'
    ];
    dataSource!: MatTableDataSource<Cliente>;

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    constructor(private clientesService: ClientesService,
            private authService:AuthService) { }

    ngOnInit(): void {
        this.clientesService.getClientes().subscribe(
            (clientes: Cliente[]) => {
                this.dataSource = new MatTableDataSource(clientes);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.isLoadingResults = false;
            });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    edit(cliente: Cliente): void {

    }

    delete(cliente: Cliente): void {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Estas a punto de boorar a " + cliente.nombre_fiscal + " y todos sus datos.", 
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                this.authService.borrarUsuario(cliente.id_usuario!).subscribe();
                this.dataSource.data = this.dataSource.data.filter(cli => cli.id_usuario !== cliente.id_usuario);
            }
        })
    }

}
