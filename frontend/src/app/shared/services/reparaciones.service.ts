import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reparacion } from 'src/app/interfaces/reparacion.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReparacionesService {

  constructor(private http: HttpClient) { }


  getAllReparaciones() {
    return this.http.get<Reparacion[]>(`${environment.baseUrl}/reparaciones`);
  }
}
