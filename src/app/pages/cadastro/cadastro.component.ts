import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableComponent } from '../../components/table/table.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NgIf } from '@angular/common';
import { ModalCadastroTarefasComponent } from '../../modal/modal-cadastro-tarefas/modal-cadastro-tarefas.component';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ale-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    TableComponent,
    ModalCadastroTarefasComponent,
    ButtonComponent,
    RouterModule,
  ],
})
export class CadastroComponent implements OnInit {
  linkUrl = '/cadastro';
  showModal = false;

  handleModalClose(result: any) {
    console.log('Resultado da modal:', result);
    this.showModal = false;
  }

  tamanhosColunas = {
    atividade: '300px',
    obs: '200px',
    valor: '100px',
    mostrarAcoes: '90px',
  };

  colunasLabels = {
    data: 'Data',
    servico: 'Serviço',
    prioridadeSelecionada: 'Prioridade',
    cliente: 'Cliente',
    atividade: 'Atividade',
    obs: 'Observações',
    quem: 'Responsável',
    statusSelecionada: 'Status',
    financeiroSelecionada: 'Financeiro',
    valor: 'Valor',
  };

  colunasProdutos = [
    'data',
    'servico',
    'prioridadeSelecionada',
    'cliente',
    'atividade',
    'obs',
    'quem',
    'statusSelecionada',
    'financeiroSelecionada',
    'valor',
    // 'valorNumerico',
  ];

  dadosProdutos: any[] = [];

  formatoProdutos = {
    preco: 'moeda',
    data: 'data',
  } as const;

  private dbService = inject(NgxIndexedDBService);

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos() {
    this.dbService.getAll('tarefas').subscribe({
      next: (tarefas) => {
        console.log('Dados carregados:', tarefas);
        this.dadosProdutos = tarefas.map((tarefa: any) => ({
          id: tarefa.id,
          data: tarefa.data,
          servico: tarefa.servico,
          prioridadeSelecionada: tarefa.prioridadeSelecionada,
          cliente: tarefa.cliente,
          atividade: tarefa.atividade,
          obs: tarefa.obs,
          quem: tarefa.quem,
          statusSelecionada: tarefa.statusSelecionada,
          financeiroSelecionada: tarefa.financeiroSelecionada,
          valor: tarefa.valor,
          // valorNumerico: tarefa.valorNumerico,
        }));
      },
      error: (error) => {
        console.error('Erro ao buscar dados:', error);
      },
    });
  }

  editarProduto(produto: any) {
    console.log('Editar:', produto);
  }

  excluirProduto(produto: any) {
    if (!produto.id) {
      console.error('Produto sem ID, impossível excluir.');
      return;
    }

    this.dbService.delete('tarefas', produto.id).subscribe({
      next: () => {
        console.log('Produto excluído com sucesso:', produto);
        // Atualiza a lista local sem o produto removido
        this.dadosProdutos = this.dadosProdutos.filter(
          (p) => p.id !== produto.id
        );
      },
      error: (error) => {
        console.error('Erro ao excluir produto:', error);
      },
    });
  }
}
