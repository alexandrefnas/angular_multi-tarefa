import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';
@Component({
  selector: 'ale-menus',
  imports: [RouterModule, NgIf],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css',
})
export class MenusComponent implements OnInit {
  cadastro: any;
  linkUrlTarefas = '/tarefas';
  linkUrlFinanceiro = '/financeiro';
  usuario: any;
  estaNaHome = false;

  @Output() sair = new EventEmitter<void>(); // ✅ Evento personalizado

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getUsuarioAtual().subscribe((user) => {
      this.usuario = user;
    });

    this.verificarRota(this.router.url); // checar na primeira carga

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.verificarRota(event.urlAfterRedirects);
      });
  }

  verificarRota(url: string): void {
    this.estaNaHome = url === '/'; // ou '/inicio', dependendo da sua rota
  }

  onSair() {
    // this.sair.emit(); // ✅ Emite o evento para o componente pai
    this.auth.logout();
  }

  isHome(): boolean {
    return this.router.url === '/'; // ajuste conforme sua rota real
  }

  acessoRapido(): void {
    if (this.estaNaHome) {
      // Envia evento para alternar a visibilidade
      window.dispatchEvent(new CustomEvent('toggleAcessoRapido'));
    } else {
      // Redireciona para home e já mostra a div
      this.router.navigate(['/'], {
        state: { mostrarAcessoRapido: true },
      });
    }
  }
}
