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

}
