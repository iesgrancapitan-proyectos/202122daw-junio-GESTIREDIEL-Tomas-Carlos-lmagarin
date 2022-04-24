import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Cliente } from '../../../interfaces/cliente';
import { ClientesService } from '../../../shared/services/clientes.service';

@Component({
    selector: 'app-table-crud',
    templateUrl: './table-crud.component.html',
    styleUrls: ['./table-crud.component.css'],
})
export class TableCrudComponent implements OnInit,OnDestroy {

    clientes!: Cliente[];

    cliente!: Cliente;

    selectedClientes!: Cliente[] | null;

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

    @ViewChild('dTable', { static: false }) dataTable: any;


    constructor(private clientesService: ClientesService) { }


    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true,
            language: {
                url:'//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
            }
        };
        this.clientesService.getClientes()
            .subscribe(data => {
                this.clientes = data;
                // Calling the DT trigger to manually render the table
                this.dtTrigger.next(null);
            });
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    editCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }

    deleteCliente(cliente: Cliente): void {
        // this.clientesService.deleteCliente(cliente.id)
        //     .subscribe(data => {
        //         this.clientes = this.clientes.filter(c => c !== cliente);
        //     });
    }

}
