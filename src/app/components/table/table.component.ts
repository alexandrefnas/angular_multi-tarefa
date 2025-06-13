import {
  CommonModule,
  NgFor,
  NgIf,
  NgStyle,
  TitleCasePipe,
} from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ale-table',
  imports: [
    NgStyle,
    TitleCasePipe,
    ButtonComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  @Input() colunas: string[] = [];
  @Input() dados: any[] = [];
  @Input() tamanhosColunas: { [coluna: string]: string } = {};
  @Input() formatoColunas: {
    [key: string]: 'texto' | 'moeda' | 'data' | 'cnpj';
  } = {};
  @Input() mostrarAcoes: boolean = false;
  @Input() colunasLabels!: { [key: string]: string };

  @Input() destacarLinha1: (item: any) => boolean = () => false;
  @Input() destacarLinha2: (item: any) => boolean = () => false;

  @Input() mostrarEditar: boolean = false;
  @Input() mostrarExcluir: boolean = false;
  @Input() linksDinamicos: { value: string; url: string }[] = [];

  @Output() editar = new EventEmitter<any>();
  @Output() excluir = new EventEmitter<any>();
  @Output() linhaClicada = new EventEmitter<any>();

  // usuario$ = this.auth.getUsuarioAtual();
  usuario: any;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUsuarioAtual().subscribe((user) => {
      this.usuario = user;
    });
  }

  get ehAdmin() {
    return this.usuario?.perfil === 'admin';
  }

  isLink(valor: string): { value: string; url: string } | null {
    return this.linksDinamicos.find((link) => link.value === valor) || null;
  }

  formatarValor(valor: any, formato: string): string {
    switch (formato) {
      case 'moeda':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valor);

      case 'cnpj':
        if (!valor) return '';
        const cnpj = valor.toString().replace(/\D/g, '');
        if (cnpj.length === 14) {
          return cnpj.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            '$1.$2.$3/$4-$5'
          );
        }

        // Retorna valor original se não for um CNPJ válido
        return valor;

      case 'data':
        if (!valor) return '';
        if (typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valor)) {
          const partes = valor.split('-');
          return `${partes[2]}/${partes[1]}/${partes[0]}`; // '29/05/2025'
        }
        return valor;
      // if (!valor) return '';
      // const data = new Date(valor);
      // if (isNaN(data.getTime())) return '';
      // return new Intl.DateTimeFormat('pt-BR').format(data);
      default:
        return valor;
    }
  }

  abrirVisualizacao(item: any) {
     this.linhaClicada.emit(item);
  }

  onEditar(item: any) {
    this.editar.emit(item);
  }

  onExcluir(item: any) {
    this.excluir.emit(item);
  }
}
