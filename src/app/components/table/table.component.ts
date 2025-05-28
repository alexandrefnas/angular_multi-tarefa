import { CommonModule, NgFor, NgIf, NgStyle, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ale-table',
  imports: [  NgStyle, TitleCasePipe, ButtonComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() colunas: string[] = [];
  @Input() dados: any[] = [];
  @Input() tamanhosColunas: { [coluna: string]: string } = {};
  @Input() formatoColunas: { [key: string]: 'texto' | 'moeda' | 'data' } = {};
  @Input() mostrarAcoes: boolean = false;
  @Input() colunasLabels!: { [key: string]: string };

  @Input() destacarLinha1: (item: any) => boolean = () => false;
  @Input() destacarLinha2: (item: any) => boolean = () => false;

  @Output() editar = new EventEmitter<any>();
  @Output() excluir = new EventEmitter<any>();

  formatarValor(valor: any, formato: string): string {
    switch (formato) {
      case 'moeda':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valor);
      case 'data':
        return new Intl.DateTimeFormat('pt-BR').format(new Date(valor));
      default:
        return valor;
    }
  }

  onEditar(item: any) {
    this.editar.emit(item);
  }

  onExcluir(item: any) {
    this.excluir.emit(item);
  }
}
