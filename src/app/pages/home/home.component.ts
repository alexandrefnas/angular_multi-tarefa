import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { NgIf } from '@angular/common';
import { ModalCadastroTarefasComponent } from '../../modal/modal-cadastro-tarefas/modal-cadastro-tarefas.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ale-home',
  imports: [ ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  showModal = false;

  handleModalClose(result: any) {
    console.log('Resultado da modal:', result);
    this.showModal = false;
  }
}
