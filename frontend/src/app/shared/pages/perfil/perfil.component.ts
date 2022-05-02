import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    nombre_fiscal: new FormControl(''),
    nif: new FormControl(''),
    domicilio: new FormControl(''),
    poblacion: new FormControl(''),
    provincia: new FormControl(''),
    cp: new FormControl(''),
  });

  constructor(
    private clientesService: ClientesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.clientesService.getClient(token!).subscribe((res: any) => {
      this.form = this.fb.group({
        nombre_fiscal: [res.nombre_fiscal, Validators.required],
        nif: [res.nif, Validators.required],
        domicilio: [res.domicilio, Validators.required],
        poblacion: [res.poblacion, Validators.required],
        provincia: [res.provincia, Validators.required],
        cp: [res.CP, Validators.required],
      });
    });
  }
}
