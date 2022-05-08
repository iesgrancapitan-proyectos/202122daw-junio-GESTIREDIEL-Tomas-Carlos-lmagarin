import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.authService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth/login')
          } else {

            const role = route.data['role'];
            const user = this.authService.usuario;
            if (user.rol !== role) {
              this.router.navigateByUrl('/auth/login')
            }
          }
        })
      );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.authService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth/login')
          }
        })
      );
  }
}
