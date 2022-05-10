import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ClientesService } from '../../../shared/services/clientes.service';
import { Cliente } from '../../../interfaces/cliente.interface';
import { map, Observable, startWith } from 'rxjs';
import { Dispositivo } from '../../../interfaces/dispositivo.interface';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ReparacionesComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isOptional = false;
  clientes!: Cliente[];
  dispositivos!: Dispositivo[]
  clienteCtrl = new FormControl("", {validators: Validators.required});
  filteredClientes!: Observable<Cliente[]>;
  clienteSelected!: Cliente;
  dispositivoSelected!:Dispositivo;

  constructor(private _formBuilder: FormBuilder,
    private clientesService: ClientesService) {

    this.clientesService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    })

    this.filteredClientes = this.clienteCtrl.valueChanges.pipe(
      startWith(''),
      map(cliente => (cliente ? this._filterClientes(cliente) : this.clientes)),
    );
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
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

  guardarSelecionCliente(cliente: Cliente) {
    this.clienteSelected = cliente;
  }

  getDispositivos() {
    if (this.firstFormGroup.valid) {
      this.clientesService.getDispositivos(this.clienteSelected.id!).subscribe(dispositivos => {this.dispositivos = dispositivos})
    }
  }
}
