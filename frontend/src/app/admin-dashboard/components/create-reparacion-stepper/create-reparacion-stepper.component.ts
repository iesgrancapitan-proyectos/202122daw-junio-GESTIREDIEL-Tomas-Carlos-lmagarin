import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ClientesService } from '../../../shared/services/clientes.service';
import { Cliente } from '../../../interfaces/cliente.interface';
import { map, Observable, startWith } from 'rxjs';
import { Dispositivo } from '../../../interfaces/dispositivo.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-reparacion-stepper',
  templateUrl: './create-reparacion-stepper.component.html',
  styleUrls: ['./create-reparacion-stepper.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CreateReparacionStepperComponent implements OnInit {
  form!: FormGroup;
  secondFormGroup!: FormGroup;
  isOptional = false;
  clientes!: Cliente[];
  dispositivos!: Dispositivo[]
  clienteCtrl = new FormControl("", {validators: Validators.required});
  filteredClientes!: Observable<Cliente[]>;
  clienteSelected!: Cliente;
  dispositivoSelected!:Dispositivo;
  buscarCliente:boolean = true;

  constructor(private _formBuilder: FormBuilder,
    private clientesService: ClientesService,
    public dialogRef: MatDialogRef<CreateReparacionStepperComponent>,
    public dialog: MatDialog) {

    this.clientesService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.filteredClientes = this.clienteCtrl.valueChanges.pipe(
        startWith(''),
        map(cliente => (cliente ? this._filterClientes(cliente) : this.clientes)),
      );
    })
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      clienteCtrl: this.clienteCtrl,
    });

    this.secondFormGroup = this._formBuilder.group({
      dispositivo: ['', Validators.required],
    });
  }

  private _filterClientes(value: string): Cliente[] {
    const filterValue = value.toLowerCase();

    return this.clientes.filter(cliente => cliente.nombre_fiscal.toLowerCase().includes(filterValue));
  }

  saveClienteSelected(cliente: Cliente,stepper:any) {
    this.clienteSelected = cliente;
    this.getDispositivos()
    
    stepper.next();
  }

  getDispositivos() {
      this.clientesService.getDispositivos(this.clienteSelected.id!).subscribe(dispositivos => {this.dispositivos = dispositivos})
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
