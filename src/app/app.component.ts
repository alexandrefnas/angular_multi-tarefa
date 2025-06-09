import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenusComponent } from './components/menu/menus/menus.component';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenusComponent],
  styleUrl: './app.component.css',
  // templateUrl: './app.component.html',
  template: `
    <header class="container__menu" >
      <ale-menus (sair)="logout()"></ale-menus>
    </header>
    <div class="containder__tela">
      <router-outlet></router-outlet>
    </div>
    `,
})
// <router-outlet />
export class AppComponent {
  title = 'angular_Multi-Tarefa';
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
