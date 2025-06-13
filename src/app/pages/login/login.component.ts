import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ale-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.erro = ''; // limpa erro anterior
    this.authService
      .login(this.email, this.senha)
      .then(() => this.router.navigate(['/'])) // redireciona para home
      .catch((err) => {
        console.error(err);
        if (err.code === 'auth/user-not-found') {
          this.erro = 'Usuário não encontrado.';
        } else if (err.code === 'auth/wrong-password') {
          this.erro = 'Senha incorreta.';
        } else {
          this.erro = 'Erro ao fazer login. Tente novamente.';
        }
      });
  }

  // login() {
  //   this.authService.login(this.email, this.senha)
  //     .then(() => this.router.navigate(['/'])) // redireciona para a home ou painel
  //     .catch((err) => {
  //       console.error(err);
  //       this.erro = 'Email ou senha inválidos';
  //     });
  // }
}
