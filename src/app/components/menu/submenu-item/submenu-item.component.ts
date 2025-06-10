import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ale-submenu-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './submenu-item.component.html',
  styleUrl: './submenu-item.component.css',
})
export class SubmenuItemComponent {
  @Input() titulo: string = '';
  @Input() itens: { label: string; rota?: string }[] = [];

  submenuAberto = false;

  abrir() {
    this.submenuAberto = true;
  }

  fechar() {
    this.submenuAberto = false;
  }
}

