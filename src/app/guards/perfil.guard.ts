import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.getUsuarioAtual().pipe(
      map((user: any) => {
        if (user?.perfil === 'admin') {
          return true;
        } else {
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}
