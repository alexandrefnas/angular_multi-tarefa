import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableComponent } from '../../components/table/table.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NgIf } from '@angular/common';
import { ModalCadastroTarefasComponent } from '../../modal/modal-cadastro-tarefas/modal-cadastro-tarefas.component';
import { RouterModule } from '@angular/router';
import { FirestoreService, Tarefa } from '../../services/firestore.service';

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
  showModal = false;

  tamanhosColunas = {
    atividade: '300px',
    obs: '200px',
    valorNumerico: '150px',
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
    // valor: 'Valor',
    valorNumerico: 'Valor',
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
    // 'valor',
    'valorNumerico',
  ];

  dadosProdutos: Tarefa[] = [];

  formatoProdutos = {
    // valor: 'moeda',
    valorNumerico: 'moeda',
    data: 'data',
  } as const;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    // this.firestoreService.getTarefas().subscribe((tarefas) => {
    //   this.dadosProdutos = tarefas.map((tarefa) => ({
    //     ...tarefa,
    //     data:
    //       tarefa.data instanceof Date
    //         ? tarefa.data
    //         : new Date((tarefa.data as any).seconds * 1000),
    //   }));
    //   console.log('Tarefas carregadas:', this.dadosProdutos);
    // });
  }

  handleModalClose(result: any) {
    console.log('Resultado da modal:', result);
    this.showModal = false;

    // Opcional: recarregar dados após fechar a modal
    // this.firestoreService.getTarefas().subscribe((tarefas) => {
    //   this.dadosProdutos = tarefas;
    // });
  }

  editarProduto(produto: any) {
    console.log('Editar:', produto);
  }

  excluirProduto(produto: any) {
    console.log('Excluir:', produto);
  }
}

// dadosProdutos = [
//   {
//     codigo: 'P001',
//     descricao: 'Teclado   Browser application bundle generation complete.',
//     descricao2: 'Teclado   Browser application bundle generation complete.',
//     preco: 99.9,
//     dataCadastro: '2024-01-10',
//   },
//   {
//     codigo: 'P002',
//     descricao: 'Mouse',
//     descricao2: 'Mouse',
//     preco: 49.5,
//     dataCadastro: '2024-02-15',
//   },
// ];

// dadosProdutos = [
//   {
//     data: '05/25/2025',
//     servico: 'Serviço',
//     prioridadeSelecionada: 'Alta',
//     cliente: 'Cliente',
//     atividade: 'Atividade',
//     obs: 'Observações',
//     quem: 'Responsável',
//     statusSelecionada: 'Feito',
//     financeiroSelecionada: 'Pago',
//     valor: 1000,
//   },
// ];
