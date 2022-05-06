import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/interfaces/apiResponse.interface';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../../interfaces/proveedor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  
  constructor(private http:HttpClient) { }

  getProveedores():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(`${environment.baseUrl}/proveedores`);
  }

  borrarProveedor(id: number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${environment.baseUrl}/proveedores/${id}`);
  }

  editarProveedor(id: number, proveedor: Proveedor) {
    return this.http.put(`${environment.baseUrl}/proveedores/${id}`, proveedor);
  }

  crearProveedor(proveedor: Proveedor) {
    return this.http.post(`${environment.baseUrl}/proveedores`, proveedor);
  }
}
