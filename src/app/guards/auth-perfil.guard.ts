import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthPerfilGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    // 🔒 Verifica se está logado
    if (!this.auth.estaLogado()) {
      this.router.navigate(['/login']);
      return false;
    }

    // 🔒 Verifica perfil
    const perfil = this.auth.getPerfilUsuario()?.perfil;

    if (perfil === 'admin') {
      return true; // ✅ Permite acesso
    } else {
      alert('Acesso restrito a administradores.');
      this.router.navigate(['/']); // 🔁 Redireciona para página inicial
      return false;
    }
  }
}
