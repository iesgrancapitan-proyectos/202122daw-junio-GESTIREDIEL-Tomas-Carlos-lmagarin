import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reparacion } from 'src/app/interfaces/reparacion.interface';
import { environment } from 'src/environments/environment';
import { Articulo } from '../../interfaces/articulo.interface';

@Injectable({
  providedIn: 'root'
})
export class ReparacionesService {
  

  constructor(private http: HttpClient) { }


  getAllReparaciones() {
    return this.http.get<Reparacion[]>(`${environment.baseUrl}/reparaciones`);
  }

  createReparacion(reparacion: Reparacion){
    return this.http.post(`${environment.baseUrl}/reparaciones`,reparacion);
  }

  addArticulo(idReparacion: number, idArticulo: number){
    return this.http.post(`${environment.baseUrl}/reparaciones/articulo`,{id_reparacion: idReparacion, id_articulo: idArticulo});
  }

  deleteArticulo(idReparacion: number, idArticulo: number){
    return this.http.put(`${environment.baseUrl}/reparaciones/reparacion/articulo`,{id_reparacion: idReparacion, id_articulo: idArticulo});
  }

  sendMail(email:string,mensaje:string):Observable<any>{
    return this.http.post(`${environment.baseUrl}/reparaciones/mail`,{email,mensaje});
  }

  crearReparacion(reparacion:any):Observable<any>{
    return this.http.post(`${environment.baseUrl}/reparaciones`,reparacion);
  }

  editarReparacion(id:number,reparacion:any):Observable<any>{
    return this.http.put(`${environment.baseUrl}/reparaciones/${id}`,reparacion);
  }

  borrarReparacion(id:number):Observable<any>{
    return this.http.delete(`${environment.baseUrl}/reparaciones/${id}`);
  }

  getReparaciones():Observable<any>{
    return this.http.get(`${environment.baseUrl}/reparaciones`);
  }

  getReparacionesPorCliente(id:string):Observable<any>{
    return this.http.get(`${environment.baseUrl}/reparaciones/cliente/${id}`);
  }

  getReparacionPorTecnico(id:string):Observable<any>{
    return this.http.get(`${environment.baseUrl}/reparaciones/tecnico/${id}`);
  }

  getArticulosReparacion(id: any):Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${environment.baseUrl}/reparaciones/articulos/${id}`);
  }

  changeState(id:number,state:string){
    return this.http.put(`${environment.baseUrl}/reparaciones/estado/${id}`,{estado:state});
  }
}
