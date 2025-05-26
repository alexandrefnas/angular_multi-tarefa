import { Component } from '@angular/core';
import { IndexeddbService } from '../../services/indexeddb.service';

@Component({
  selector: 'ale-home',
  imports: [ ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // linkUrl = '#';
  showModal = false;

  handleModalClose(result: any) {
    console.log('Resultado da modal:', result);
    this.showModal = false;
  }

  constructor(private indexeddbService: IndexeddbService) {
    // O banco já será aberto automaticamente ao instanciar o serviço.
  }
}
