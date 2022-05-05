import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulo } from '../../interfaces/articulo.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  

  constructor(private http:HttpClient) { }


  getArticulos():Observable<Articulo[]>{
    return this.http.get<Articulo[]>(`${environment.baseUrl}/articulos`);
  }

  editarArticulo(id: number, articulo: Articulo) { 
    return this.http.put(`${environment.baseUrl}/articulos/editar/${id}`, articulo);
  }

}
