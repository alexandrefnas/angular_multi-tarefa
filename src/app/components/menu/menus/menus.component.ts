import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'ale-menus',
  imports: [RouterModule],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css',
})
export class MenusComponent {
  cadastro: any;
  // linkText = 'Cadastro';
  // linkUrl = '/cadastro';
  // linkUrl2 = '/teste';
  linkUrlTarefas = '/tarefas';
  linkUrlFinanceiro = '/financeiro';

}
