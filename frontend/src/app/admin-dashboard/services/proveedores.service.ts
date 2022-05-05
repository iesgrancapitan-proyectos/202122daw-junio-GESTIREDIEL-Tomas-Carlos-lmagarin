import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
