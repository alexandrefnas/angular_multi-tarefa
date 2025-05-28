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
  linkText = 'Cadastro';
  linkUrl = '/cadastro';
  // linkText2: string = "Teste";
  linkUrl2 = '/teste';
  linkUrlTarefas = '/tarefas';
  // constructor(private router: Router) {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       if (event.urlAfterRedirects === '/cadastro') {
  //         this.linkText = 'Home';
  //         this.linkUrl = '/';
  //       } else {
  //         this.linkText = 'Cadastro';
  //         this.linkUrl = '/cadastro';
  //       }
  //     }
  //   });
  // }
}
