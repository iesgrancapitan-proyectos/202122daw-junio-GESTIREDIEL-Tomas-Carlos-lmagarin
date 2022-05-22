import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReparacionesService {

  constructor(private http:HttpClient) { }

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

}
