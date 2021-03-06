import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ClientesService } from '../../../shared/services/clientes.service';
import { Cliente } from '../../../interfaces/cliente.interface';
import { map, Observable, startWith } from 'rxjs';
import { Dispositivo } from '../../../interfaces/dispositivo.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

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
  clienteCtrl = new FormControl("", { validators: Validators.required });
  filteredClientes!: Observable<Cliente[]>;
  clienteSelected!: Cliente;
  dispositivoSelected!: Dispositivo | undefined;
  buscarCliente: boolean = true;

  radios!: string

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

  saveClienteSelected(cliente: Cliente, stepper: any) {
    this.clienteSelected = cliente;
    this.getDispositivos()
    stepper.next();
  }

  getDispositivos() {
    this.clientesService.getDispositivos(this.clienteSelected.id!).subscribe(dispositivos => { this.dispositivos = dispositivos })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  actualizarLista(dispositivo: Dispositivo) {
    this.dispositivoSelected = dispositivo;
    this.dispositivos.unshift(dispositivo);
    this.secondFormGroup.get('dispositivo')!.setValue(dispositivo);
  }

  actualizarDispositivo(dispositivo: Dispositivo) {
    this.dispositivos[this.dispositivos.indexOf(this.dispositivos.filter(d => d.id === dispositivo.id)[0])] = dispositivo;
  }

  seleccionarDispositivo(dispositivo: Dispositivo) {
    this.dispositivoSelected = dispositivo;
  }

  toogleBuscarCliente() {
    this.buscarCliente = !this.buscarCliente;
    this.clienteCtrl.setValue('');
    this.clienteSelected = {} as Cliente;
  }

  borrarDispositivo(dispositivo: Dispositivo) {
    Swal.fire({
      title: '??Est??s seguro?',
      text: "??No podr??s revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.value) {

        this.clientesService.borrarDispositivo(dispositivo.id!).subscribe({
          next: () => {
            this.dispositivos = this.dispositivos.filter(d => d.id !== dispositivo.id);
            Swal.fire({
              title: 'Borrado!',
              text: 'El dispositivo ha sido borrado.',
              icon:'success',
              showConfirmButton: false,
              timer: 1500
            })
          },
          error: () => {
            Swal.fire(
              'Error!',
              'Ha ocurrido un error.',
              'error'
            )
          }
        })
      }
    })
  }

  nuevoDispositivo(){
    this.dispositivoSelected = undefined
    this.radios = ''
  }
}
