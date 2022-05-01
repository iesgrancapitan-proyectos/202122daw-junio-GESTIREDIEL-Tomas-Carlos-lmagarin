import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario,AuthResponse } from '../AuthResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;
  
  constructor(private http:HttpClient) { }

  get usuario() {
    return { ...this._usuario };
  }

  singup(username: string, email: string, password: string, rol:string) {

    const url = `${this.baseUrl}/auth/new`
    const body = { username, email, password , rol}
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
            this.saveToken(resp);
        }),
        map((res) => {
          return res.ok
        }),
        catchError(err => of(err.error.msg))
      )
  }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth`
    const body = { email, password }
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          this.saveToken(resp);
        }),
        map((res) => {
          return res.ok
        }),
        catchError(err => of(err.error))
      )
  }

  private saveToken(resp: AuthResponse) {
    if (resp.ok) {
      localStorage.setItem('token', resp.token!);
    }
  }

  validarToken(): Observable<boolean> {
    const url: string = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || "")

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          this.saveToken(resp);
          this._usuario = {
            username: resp.username!,
            email: resp.email!,
            uid: resp.uid!,
          }
          return resp.ok
        }),
        catchError(() => of(false))
      )
  }

  logout() {
    localStorage.clear()
  }

  borrarUsuario(id_usuario: string){
    const url = `${this.baseUrl}/auth/${id_usuario}`
    return this.http.delete(url)
  }

}
