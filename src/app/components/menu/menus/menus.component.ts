import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { SubmenuItemComponent } from '../submenu-item/submenu-item.component';
@Component({
  selector: 'ale-menus',
  imports: [RouterModule, NgIf, SubmenuItemComponent],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css',
})
export class MenusComponent implements OnInit {
  cadastro: any;
  linkUrlTarefas = '/tarefas';
  linkUrlFinanceiro = '/financeiro';
  usuario: any;
  estaNaHome = false;
  submenuAberto = false;
  submenuAberto2 = false;

  @Output() sair = new EventEmitter<void>(); // ✅ Evento personalizado

  // toggleSubmenu(event: MouseEvent) {
  //   event.preventDefault(); // evita navegação
  //   this.submenuAberto = !this.submenuAberto;
  // }

  financeiro = [
    { label: 'Contas a Receber', rota: this.linkUrlFinanceiro , somenteAdmin:true},
    { label: 'Contas a Pagar' },
  ];

  controle = [
    { label: 'Usuários', rota: '/cadastro', somenteAdmin:true },
    { label: 'Clientes', rota: '/clientepj'},
    { label: 'Atividades' },
    { label: 'Receitas' },
    { label: 'Despesas' },
    { label: 'Links' },
  ];

  // abrirSubmenu() {
  //   this.submenuAberto = true;
  // }
  // abrirSubmenu2() {
  //   this.submenuAberto2 = true;
  // }

  // fecharSubmenu() {
  //   this.submenuAberto = false;
  // }
  // fecharSubmenu2() {
  //   this.submenuAberto2 = false;
  // }

  constructor(public auth: AuthService, private router: Router) {}
  get isAdmin(): boolean {
    return this.usuario?.perfil === 'admin';
  }

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

  getItensVisiveis(itens: any[]): any[] {
    return itens.filter((item) => !item.somenteAdmin || this.isAdmin);
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
