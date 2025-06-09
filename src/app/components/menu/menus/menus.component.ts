import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';
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

  @Output() sair = new EventEmitter<void>(); // ✅ Evento personalizado

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUsuarioAtual().subscribe((user) => {
      this.usuario = user;
    });
  }

  onSair() {
    // this.sair.emit(); // ✅ Emite o evento para o componente pai
    this.auth.logout();
  }
}
