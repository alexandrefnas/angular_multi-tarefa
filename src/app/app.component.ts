import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenusComponent } from "./components/menu/menus/menus.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_Multi-Tarefa';
}
