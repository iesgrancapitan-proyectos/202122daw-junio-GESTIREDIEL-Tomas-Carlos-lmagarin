import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Observable } from 'rxjs';
import { Dispositivo } from 'src/app/interfaces/dispositivo.interface';

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

  editarCliente(id: string, cliente: Cliente) {
    return this.http.put<Cliente>(`${environment.baseUrl}/clientes/${id}`, cliente);
  }

  getClient(token: string) {
    return this.http.get<Cliente>(`${environment.baseUrl}/clientes/user/${token}`);
  }

  getDispositivos(id: string):Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${environment.baseUrl}/clientes/dispositivos/${id}`);
  }

  createDispositivo(idCliente:string,dispositivo: Dispositivo) {
    return this.http.post<Dispositivo>(`${environment.baseUrl}/clientes/dispositivos/${idCliente}`, dispositivo);
  }

}
