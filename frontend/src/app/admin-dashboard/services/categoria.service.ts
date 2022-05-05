import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  getCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${environment.baseUrl}/categorias`);
  }

  createCategoria(categoria: Categoria) {
    return this.http.post(`${environment.baseUrl}/categorias`, categoria);
  }

  borrarCategoria(id: number) {
    return this.http.delete(`${environment.baseUrl}/categorias/${id}`);
  }

}
