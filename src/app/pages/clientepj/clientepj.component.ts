import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import {
  Clientepj,
  FirestoreService,
  Tarefa,
} from '../../services/firestore.service';
import { ModalClientepjComponent } from '../../modal/modal-clientepj/modal-clientepj.component';

@Component({
  selector: 'ale-clientepj',
  imports: [
    FormsModule,
    ButtonComponent,
    TableComponent,
    ModalClientepjComponent,
  ],
  templateUrl: './clientepj.component.html',
  styleUrl: './clientepj.component.css',
})
export class ClientepjComponent implements OnInit {
  termoPesquisa: string = '';
  mostrarModal = false;
  modoVisualizacao = false;
  mostrarModalEditar = false;
  title = 'Cadastro';
  colunasLabels = {
    razaoSocial: 'Razão Social',
    cnpj: 'CNPJ',
    nomeResponsavel: 'Nome Responsável',
  };

  colunasProdutos = ['razaoSocial', 'cnpj', 'nomeResponsavel'];

  tamanhosColunas = {
    razaoSocial: { width: '250px' },
    cnpj: { width: '150px' },
    nomeResponsavel: { width: 'auto', minWidth: '200px' },
    mostrarAcoes: { width: '100px' },
  };

  formatoProdutos = {
    cnpj: 'cnpj',
  } as const;

  listaClientespj: Clientepj[] = [];
  clientepjEmEdicao: Clientepj | null = null;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.carregarClientes();
  }

  fecharModal() {
    this.mostrarModal = false;
    this.modoVisualizacao = false;
    this.mostrarModalEditar = false;
    console.log(
      'FECHAR mostrarModal: ' +
        this.mostrarModal +
        ' modoVisualizacao: ' +
        this.modoVisualizacao
    );
  }

  carregarClientes(): void {
    const ref = this.firestoreService;
    const collectionRef = ref && ref['firestore'] ? ref['firestore'] : null;

    if (!collectionRef) {
      console.error('Firestore não está inicializado.');
      return;
    }

    // Se quiser usar o get direto:
    this.firestoreService.getClientepj().subscribe((clientes) => {
      this.listaClientespj = clientes;
    });
  }

  abrirVisualizacao(cliente: Clientepj): void {
    this.title = 'Visualização de Cliente';
    this.clientepjEmEdicao = { ...cliente };
    this.modoVisualizacao = true; // modo somente visualização (form bloqueado)
    this.mostrarModal = true;
    console.log(
      'VISUALIZAR mostrarModal: ' +
        this.mostrarModal +
        ' modoVisualizacao: ' +
        this.modoVisualizacao
    );
  }

  editarCliente(cliente: Clientepj): void {
    this.title = 'Editar Cadastro Cliente';
    this.clientepjEmEdicao = { ...cliente };
    this.mostrarModal = true;
    this.modoVisualizacao = false;
    console.log(
      'EDITAR mostrarModal: ' +
        this.mostrarModal +
        ' modoVisualizacao: ' +
        this.modoVisualizacao
    );
  }

  // excluirCliente(cliente: any): void {}
  async excluirCliente(clientepj: Clientepj): Promise<void> {
    const confirmacao = confirm(
      `Tems certeza que deseja excluir O Cliente  "${clientepj.razaoSocial}"?`
    );
    if (!confirmacao) {
      return;
    }

    if (clientepj.id) {
      try {
        await this.firestoreService.deleteClientepj(clientepj.id);
        console.log('Cliente excluído:', clientepj);
        this.carregarClientes();
      } catch (error) {
        console.error('Erro ao excluir Cliente:', error);
      }
    }
  }

  buttonClick(): void {
    this.title = 'Cadastro de Cliente';
    this.clientepjEmEdicao = null;
    // this.modoVisualizacao = false; // cadastro = modo edição habilitado
    this.mostrarModal = true;
  }
}
// [
//     {
//       razaoSocial: 'Auto Mecânica Teste',
//       cnpj: '33333333000122',
//       nomeResponsavel: 'testando essa tabela',
//     },
//     {
//       razaoSocial: 'Comercio de teste',
//       cnpj: '33333333000122',
//       nomeResponsavel: 'testando essa tabela',
//     },
//     {
//       razaoSocial: 'Pesque pague teste',
//       cnpj: '33333333000122',
//       nomeResponsavel: 'testando essa tabela',
//     },
//     {
//       razaoSocial: 'Supermercado só Teste',
//       cnpj: '33333333000122',
//       nomeResponsavel: 'testando essa tabela',
//     },
//   ];
