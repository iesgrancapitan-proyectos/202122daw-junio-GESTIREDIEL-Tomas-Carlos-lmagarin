import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reparacion } from 'src/app/interfaces/reparacion.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReparacionesService {

  constructor(private http: HttpClient) { }

  getReparacion(id: string) {
    return this.http.get<Reparacion>(`${environment.baseUrl}/reparaciones/cliente/${id}`);
  }

  getAllReparaciones() {
    return this.http.get<Reparacion[]>(`${environment.baseUrl}/reparaciones`);
  }

  createReparacion(reparacion: Reparacion){
    return this.http.post(`${environment.baseUrl}/reparaciones`,reparacion);
  }
}
