import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Cliente } from '../../../interfaces/cliente';
import { ClientesService } from '../../../shared/services/clientes.service';

@Component({
    selector: 'app-table-crud',
    templateUrl: './table-crud.component.html',
    styleUrls: ['./table-crud.component.css'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    providers: [MessageService,ConfirmationService]
})
export class TableCrudComponent implements OnInit {

    clienteDialog!: boolean;

    clientes!: Cliente[];

    cliente!:Cliente;

    selectedClientes!: Cliente[] | null;

    submitted!: boolean;

    statuses!: any[];

    constructor(private clientesService:ClientesService,private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.clientesService.getClientes().subscribe(clientes => {
            this.clientes = clientes;
        });

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }

    openNew() {
        this.cliente = {} as Cliente;
        this.submitted = false;
        this.clienteDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: '¿Estas seguro de querer borrar estos clientes?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clientes = this.clientes.filter(val => !this.selectedClientes?.includes(val));
                this.selectedClientes = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Cliente borrado', life: 3000});
            }
        });
    }

    editProduct(cliente: Cliente) {
        this.cliente = {...cliente};
        this.clienteDialog = true;
    }

    deleteProduct(cliente: Cliente) {
        this.confirmationService.confirm({
            message: '¿Estas seguro que quieres borrar el cliente ' + cliente.nombre_fiscal + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clientes = this.clientes.filter(val => val.id_usuario !== cliente.id_usuario);
                this.cliente = {} as Cliente;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Cliente borrado', life: 3000});
            }
        });
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        // if (this.product.name.trim()) {
        //     if (this.product.id) {
        //         this.products[this.findIndexById(this.product.id)] = this.product;
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        //     }
        //     else {
        //         this.product.id = this.createId();
        //         this.product.image = 'product-placeholder.svg';
        //         this.products.push(this.product);
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        //     }

        //     this.products = [...this.products];
        //     this.productDialog = false;
        //     this.product = {};
        // }
    }

    findIndexById(id: string): number {
        let index = -1;
        // for (let i = 0; i < this.products.length; i++) {
        //     if (this.products[i].id === id) {
        //         index = i;
        //         break;
        //     }
        // }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}