import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { ModalTarefasComponent } from '../../modal/modal-tarefas/modal-tarefas.component';
import { FirestoreService, Tarefa } from '../../services/firestore.service';
import { TableComponent } from '../../components/table/table.component';
import { CommonModule } from '@angular/common';
import { DataAleComponent } from '../../components/filds/data-ale/data-ale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ale-controle-financeiro',
  imports: [
    ButtonComponent,
    ModalTarefasComponent,
    TableComponent,
    CommonModule,
    FormsModule,
    DataAleComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './controle-financeiro.component.html',
  styleUrl: './controle-financeiro.component.css',
})
export class ControleFinanceiroComponent {
  mostrarModalEditar: boolean = false;

  mostrarModal: boolean = false;
  prioridades = [
    // { value: '', label: '' },
    { value: 'Alta', label: 'Alta' },
    { value: 'Moderado', label: 'Moderado' },
    { value: 'Baixa', label: 'Baixa' },
  ];

  status = [
    // { value: '', label: '' },
    { value: 'Feito', label: 'Feito' },
  ];

  financeiro = [
    // { value: '', label: '' },
    { value: 'Pago', label: 'Pago' },
  ];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  filtros: boolean = false;
  mostrarTodos: boolean = false;
  mostrarTodosAtivo: boolean = false;
  tarefaEmEdicao: Tarefa | null = null;
  dadosProdutos: Tarefa[] = [];
  dataInicio: Date | null = null;
  dataFim: Date | null = null;
  termoPesquisa: string = '';

  // destacarAlta = (item: any) => item.prioridadeSelecionada === 'Alta';
  // destacarMedio = (item: any) => item.prioridadeSelecionada === 'Moderado';

  tamanhosColunas = {
    cliente: { width: '150px' },
      atividade: { width: 'auto' },
      valorNumerico: { width: '150px' },
      mostrarAcoes: { width: '60px' },
  };

  colunasLabels = {
    data: 'Data',
    // servico: 'Serviço',
    // prioridadeSelecionada: 'Prioridade',
    cliente: 'Cliente',
    atividade: 'Atividade',
    obs: 'Observações',
    quem: 'Responsável',
    dataConclusao: 'Conclusão',
    // statusSelecionada: 'Status',
    financeiroSelecionada: 'Financeiro',
    // valor: 'Valor',
    valorNumerico: 'Valor',
  };

  colunasProdutos = [
    'data',
    // 'servico',
    // 'prioridadeSelecionada',
    'cliente',
    'atividade',
    // 'obs',
    // 'quem',
    'dataConclusao',
    // 'statusSelecionada',
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

  filtrosCheckbox(): void {
    // if (this.mostrarTodosAtivo) {
    if (!this.filtros) this.filtros = false;
    else this.filtros = true;
    // this.mostrarTodosAtivo = false;
    // this.carregarTarefas();
    // }
  }

  verificarCheckbox(): void {
    if (this.mostrarTodosAtivo) {
      this.mostrarTodos = false;
      this.mostrarTodosAtivo = false;
      // this.carregarTarefas();
    } else {
      this.mostrarTodos = true;
      this.mostrarTodosAtivo = true;
      // this.mostrarTodosAtivo = true;
    }
  }

  buttonBuscar(): void {
    this.carregarTarefas();
    console.log(
      'verificando filtro ' + this.mostrarTodos + ' ' + this.mostrarTodosAtivo
    );
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

  carregarTarefas(): void {
    this.firestoreService.getTarefas().subscribe((tarefas) => {
      let tarefasMapeadas = tarefas.map((tarefa) => ({
        ...tarefa,
        data: tarefa.data,
        dataConclusao: tarefa.dataConclusao || '',
      }));

      // ✅ Filtro inicial: valorNumerico > 0
      tarefasMapeadas = tarefasMapeadas.filter(
        (tarefa) => tarefa.valorNumerico > 0
      );

      tarefasMapeadas.sort((a, b) => {
        // Se prioridades forem iguais, ordena por data mais antiga
        const dataA =
          a.data instanceof Date ? this.formatarDataString(a.data) : a.data;
        const dataB =
          b.data instanceof Date ? this.formatarDataString(b.data) : b.data;

        return dataA.localeCompare(dataB);
      });
      // ✅ Sempre aplica o filtro de período se houver datas
      if (this.dataInicio && this.dataFim) {
        tarefasMapeadas = this.filtrarPorPeriodo(
          tarefasMapeadas,
          this.dataInicio,
          this.dataFim
        );
      }

      // ✅ Filtro de pesquisa por palavra
      tarefasMapeadas = this.filtrarPorPesquisa(
        tarefasMapeadas,
        this.termoPesquisa
      );

      if (this.mostrarTodos) {
        this.dadosProdutos = tarefasMapeadas;
        // console.log('Exibindo todas as tarefas após filtro de período.');
      } else {
        this.dadosProdutos = tarefasMapeadas.filter((tarefa) => {
          const dataConclusaoVazia = !tarefa.dataConclusao;
          const financeiroVazio =
            !tarefa.financeiroSelecionada ||
            tarefa.financeiroSelecionada === '';
          const valorMaiorQueZero = tarefa.valorNumerico > 0;
          // console.log(tarefa.valorNumerico);
          if (dataConclusaoVazia) {
            return valorMaiorQueZero ? financeiroVazio : true;
          } else {
            return valorMaiorQueZero ? financeiroVazio : false;
          }
        });
        // console.log('Exibindo tarefas com todos os filtros aplicados.');
      }
    });
  }

  private filtrarPorPesquisa(tarefas: any[], termo: string): any[] {
    if (!termo || termo.trim() === '') {
      return tarefas;
    }

    const termoLower = termo.toLowerCase();

    return tarefas.filter((tarefa) => {
      return (
        (tarefa.cliente && tarefa.cliente.toLowerCase().includes(termoLower)) ||
        (tarefa.atividade &&
          tarefa.atividade.toLowerCase().includes(termoLower)) ||
        (tarefa.data &&
          tarefa.data.toString().toLowerCase().includes(termoLower)) ||
        (tarefa.financeiroSelecionada &&
          tarefa.financeiroSelecionada
            .toString()
            .toLowerCase()
            .includes(termoLower))
      );
    });
  }

  private filtrarPorPeriodo(
    tarefas: any[],
    dataInicio: string | Date,
    dataFim: string | Date
  ): any[] {
    const inicio = this.formatarDataString(new Date(dataInicio));
    const fim = this.formatarDataString(new Date(dataFim));

    console.log('Filtro de período:');
    console.log('Início:', inicio);
    console.log('Fim:', fim);

    return tarefas.filter((tarefa) => {
      const tarefaData =
        tarefa.data instanceof Date
          ? this.formatarDataString(tarefa.data)
          : tarefa.data;

      return tarefaData >= inicio && tarefaData <= fim;
    });
  }

  private formatarDataString(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
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
