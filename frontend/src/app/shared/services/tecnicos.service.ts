import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnico } from '../../interfaces/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicosService {

  constructor(private http: HttpClient) { }


  createTecnico(tecnico: Tecnico) {
    return this.http.post<Tecnico>(`${environment.baseUrl}/tecnicos`, tecnico);
  }

  getTecnicos():Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${environment.baseUrl}/tecnicos`);
  }

  editarTecnico(id: string, tecnico: any) {
    return this.http.put<Tecnico>(`${environment.baseUrl}/tecnicos/${id}`, tecnico);
  }
}
