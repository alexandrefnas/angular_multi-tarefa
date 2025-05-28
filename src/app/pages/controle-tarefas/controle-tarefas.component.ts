import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { FirestoreService, Tarefa } from '../../services/firestore.service';
import { ModalTarefasComponent } from '../../modal/modal-tarefas/modal-tarefas.component';

@Component({
  selector: 'ale-controle-tarefas',
  imports: [ButtonComponent, TableComponent, ModalTarefasComponent],
  templateUrl: './controle-tarefas.component.html',
  styleUrl: './controle-tarefas.component.css',
})
export class ControleTarefasComponent {
  mostrarModal: boolean = false;
  mostrarModalEditar: boolean = false;

  tarefaEmEdicao: Tarefa | null = null;

  dadosProdutos: Tarefa[] = [];

  prioridades = [
    { value: '', label: '' },
    { value: 'Alta', label: 'Alta' },
    { value: 'Moderado', label: 'Moderado' },
    { value: 'Baixa', label: 'Baixa' },
  ];

  destacarAlta = (item: any) => item.prioridadeSelecionada === 'Alta';
  destacarMedio = (item: any) => item.prioridadeSelecionada === 'Moderado';

  status = [
    { value: '', label: '' },
    { value: 'Feito', label: 'Feito' },
  ];

  financeiro = [
    { value: '', label: '' },
    { value: 'Pago', label: 'Pago' },
  ];

  tamanhosColunas = {
    atividade: '200px',
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
    dataConclusao: 'Conclusão',
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
    'dataConclusao',
    'statusSelecionada',
    'financeiroSelecionada',
    // 'valor',
    'valorNumerico',
  ];

  formatoProdutos = {
    // valor: 'moeda',
    valorNumerico: 'moeda',
    data: 'data',
    dataConclusao: 'data',
  } as const;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.firestoreService.getTarefas().subscribe((tarefas) => {
      this.dadosProdutos = tarefas.map((tarefa) => ({
        ...tarefa,
        data:
          tarefa.data instanceof Date
            ? tarefa.data
            : new Date((tarefa.data as any).seconds * 1000),

        dataConclusao:
          tarefa.dataConclusao instanceof Date
            ? tarefa.dataConclusao
            : tarefa.dataConclusao
            ? new Date((tarefa.dataConclusao as any).seconds * 1000)
            : null,
      }));
    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
    this.mostrarModalEditar = true;
    this.tarefaEmEdicao = null;
  }

  // Método chamado quando o modal é fechado
  fecharModal(): void {
    this.mostrarModal = false;
    this.mostrarModalEditar = false;
    this.tarefaEmEdicao = null;
  }

  async salvarTarefa(tarefa: Tarefa): Promise<void> {
    try {
      if (this.tarefaEmEdicao && this.tarefaEmEdicao.id) {
        // Edição
        await this.firestoreService.updateTarefa(
          this.tarefaEmEdicao.id,
          tarefa
        );
        console.log('Tarefa editada com sucesso:', tarefa);
      } else {
        // Cadastro
        await this.firestoreService.addTarefa(tarefa);
        console.log('Tarefa cadastrada com sucesso:', tarefa);
      }
      this.fecharModal();
      this.carregarTarefas();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  }

  gerarId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  handleModalClose(result: any) {
    console.log('Resultado da modal:', result);
    this.mostrarModal = false;
    this.mostrarModalEditar = false;

    // Opcional: recarregar dados após fechar a modal
    // this.firestoreService.getTarefas().subscribe((tarefas) => {
    //   this.dadosProdutos = tarefas;
    // });
  }

  editarProduto(produto: Tarefa): void {
    console.log('Editar:', produto);
    this.tarefaEmEdicao = { ...produto }; // Faz uma cópia para não editar diretamente
    this.mostrarModal = true;
    this.mostrarModalEditar = true;
  }

  async excluirProduto(produto: Tarefa): Promise<void> {
    const confirmacao = confirm(
      `Tems certeza que deseja excluir a tarefa  "${produto.atividade}"?`
    );
    if (!confirmacao) {
      return;
    }

    if (produto.id) {
      try {
        await this.firestoreService.deleteTarefa(produto.id);
        console.log('Tarefa excluída:', produto);
        this.carregarTarefas();
      } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
      }
    }
  }
}
