import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Cliente } from 'src/app/interfaces/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }


  createCliente(cliente: Cliente) {
    return this.http.post<Cliente>(`${environment.baseUrl}/clientes`, cliente);
  }

  getClientes():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.baseUrl}/clientes`);
  }

}
