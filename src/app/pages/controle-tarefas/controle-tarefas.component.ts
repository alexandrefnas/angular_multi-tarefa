import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { FirestoreService, Tarefa } from '../../services/firestore.service';
import { ModalTarefasComponent } from '../../modal/modal-tarefas/modal-tarefas.component';
import { DataAleComponent } from '../../components/filds/data-ale/data-ale.component';
import { fail } from 'node:assert';
import { InputAleComponent } from '../../components/filds/input-ale/input-ale.component';
import { LinkService } from '../../shared/link.service';

@Component({
  selector: 'ale-controle-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    TableComponent,
    ModalTarefasComponent,
    DataAleComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './controle-tarefas.component.html',
  styleUrl: './controle-tarefas.component.css',
})
export class ControleTarefasComponent {
  mostrarModal: boolean = false;
  mostrarModalEditar: boolean = false;

  filtros: boolean = false;
  mostrarTodos: boolean = false;
  mostrarTodosAtivo: boolean = false;

  tarefaEmEdicao: Tarefa | null = null;

  dadosProdutos: Tarefa[] = [];
  termoPesquisa: string = '';

  dataInicio: string | Date | null = null;
  dataFim: string | Date | null = null;

  links: any[] = [];

  prioridades = [
    { value: 'Alta', label: 'Alta' },
    { value: 'Moderado', label: 'Moderado' },
    { value: 'Baixa', label: 'Baixa' },
  ];

  destacarAlta = (item: any) => item.prioridadeSelecionada === 'Alta';
  destacarMedio = (item: any) => item.prioridadeSelecionada === 'Moderado';

  status = [{ value: 'Feito', label: 'Feito' }];

  financeiro = [{ value: 'Pago', label: 'Pago' }];

  tamanhosColunas = {
    cliente: { width: '150px' },
    atividade: { width: 'auto' },
    obs: { width: 'auto' },
    valorNumerico: { width: '150px' },
    mostrarAcoes: { width: '100px' },
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
  ];

  formatoProdutos = {
    valorNumerico: 'moeda',
    data: 'data',
    dataConclusao: 'data',
  } as const;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private firestoreService: FirestoreService,
    private linkService: LinkService
  ) {
    this.links = this.linkService.links;
  }

  ngOnInit(): void {
    // Verifica se há uma prioridade selecionada no localStorage
    if (isPlatformBrowser(this.platformId)) {
      const prioridadeSelecionada = localStorage.getItem(
        'prioridadeSelecionada'
      );

      if (prioridadeSelecionada) {
        console.log(
          'Prioridade recebida do localStorage:',
          prioridadeSelecionada
        );

        // Aplicando a prioridade no filtro de pesquisa
        this.termoPesquisa = prioridadeSelecionada;

        // ✅ Opcional: limpa o localStorage para não manter o filtro
        localStorage.removeItem('prioridadeSelecionada');
      }
      this.carregarTarefas();
    } else {
      console.warn('Ignorando carregarTarefas() pois não está no browser.');
    }
  }

  filtrosCheckbox(): void {
    // if (!this.filtros)
    // else
    // this.filtros = !this.filtros;
    if (!this.filtros) {
      this.filtros = false;
      this.limparFiltros();
    } else {
      this.filtros = true;
    }
  }

  verificarCheckbox(): void {
    if (this.mostrarTodosAtivo) {
      this.mostrarTodos = false;
      this.mostrarTodosAtivo = false;
      this.carregarTarefas();
    } else {
      this.mostrarTodos = true;
      this.mostrarTodosAtivo = true;
    }
  }

  buttonBuscar(): void {
    this.carregarTarefas();
    console.log(
      'verificando filtro ' + this.mostrarTodos + ' ' + this.mostrarTodosAtivo
    );
  }

  carregarTarefas(): void {
    this.firestoreService.getTarefas().subscribe((tarefas) => {
      let tarefasMapeadas = tarefas.map((tarefa) => ({
        ...tarefa,
        data: tarefa.data,
        dataConclusao: tarefa.dataConclusao || '',
      }));

      tarefasMapeadas.sort((a, b) => {
        const prioridadeA = (a.prioridadeSelecionada || '').toLowerCase();
        const prioridadeB = (b.prioridadeSelecionada || '').toLowerCase();

        if (prioridadeA < prioridadeB) return -1;
        if (prioridadeA > prioridadeB) return 1;

        // Se prioridades forem iguais, ordena por data mais antiga
        const dataA =
          a.data instanceof Date ? this.formatarDataString(a.data) : a.data;
        const dataB =
          b.data instanceof Date ? this.formatarDataString(b.data) : b.data;

        return dataA.localeCompare(dataB);
      });
      // ✅ Sempre aplica o filtro de período se houver datas
      if (this.dataInicio || this.dataFim) {
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

          return dataConclusaoVazia;
        });
        // console.log('Exibindo tarefas com todos os filtros aplicados.');
      }
    });
  }

  private filtrarPorPeriodo(
    tarefas: any[],
    dataInicio: string | Date | null,
    dataFim: string | Date | null
  ): any[] {
    return tarefas.filter((tarefa) => {
      const tarefaData =
        tarefa.data instanceof Date
          ? this.formatarDataString(tarefa.data)
          : tarefa.data;

      if (dataInicio && dataFim) {
        const inicio = this.formatarDataString(new Date(dataInicio));
        const fim = this.formatarDataString(new Date(dataFim));
        return tarefaData >= inicio && tarefaData <= fim;
      } else if (dataInicio) {
        const inicio = this.formatarDataString(new Date(dataInicio));
        return tarefaData >= inicio;
      } else if (dataFim) {
        const fim = this.formatarDataString(new Date(dataFim));
        return tarefaData <= fim;
      }
      return true;
    });
  }

  limparFiltros(): void {
    this.dataInicio = null;
    this.dataFim = null;
    this.termoPesquisa = '';
    this.mostrarTodos = false;
    this.mostrarTodosAtivo = false;
    this.carregarTarefas();
  }

  // private filtrarPorPeriodo(
  //   tarefas: any[],
  //   dataInicio: string | Date | null,
  //   dataFim: string | Date | null
  // ): any[] {
  //   const inicio = this.formatarDataString(new Date(dataInicio));
  //   const fim = this.formatarDataString(new Date(dataFim));

  //   console.log('Filtro de período:');
  //   console.log('Início:', inicio);
  //   console.log('Fim:', fim);

  //   return tarefas.filter((tarefa) => {
  //     const tarefaData =
  //       tarefa.data instanceof Date
  //         ? this.formatarDataString(tarefa.data)
  //         : tarefa.data;

  //     return tarefaData >= inicio && tarefaData <= fim;
  //   });
  // }

  // private filtrarPorPesquisa(tarefas: any[], termo: string): any[] {
  //   if (!termo || termo.trim() === '') {
  //     return tarefas;
  //   }

  //   const termoLower = termo.toLowerCase();

  //   return tarefas.filter((tarefa) => {
  //     return (
  //       (tarefa.servico && tarefa.servico.toLowerCase().includes(termoLower)) ||
  //       (tarefa.cliente && tarefa.cliente.toLowerCase().includes(termoLower)) ||
  //       (tarefa.atividade &&
  //         tarefa.atividade.toLowerCase().includes(termoLower)) ||
  //       (tarefa.prioridadeSelecionada &&
  //         tarefa.prioridadeSelecionada.toLowerCase().includes(termoLower)) ||
  //       (tarefa.data &&
  //         tarefa.data.toString().toLowerCase().includes(termoLower)) ||
  //       (tarefa.obs &&
  //         tarefa.obs.toString().toLowerCase().includes(termoLower)) ||
  //       (tarefa.quem &&
  //         tarefa.quem.toString().toLowerCase().includes(termoLower)) ||
  //       (tarefa.financeiroSelecionada &&
  //         tarefa.financeiroSelecionada
  //           .toString()
  //           .toLowerCase()
  //           .includes(termoLower))
  //     );
  //   });
  // }

  private filtrarPorPesquisa(tarefas: any[], termo: string): any[] {
    if (!termo || termo.trim() === '') {
      return tarefas;
    }

    const termoLower = termo.toLowerCase().trim();
    const termoISO = this.converterDataParaISO(termoLower); // tenta converter para yyyy-MM-dd
    const termoEhData = !!termoISO; // só filtra por data se for válido

    return tarefas.filter((tarefa) => {
      const data =
        tarefa.data instanceof Date
          ? this.formatarDataString(tarefa.data)
          : tarefa.data;

      const dataConclusao =
        tarefa.dataConclusao instanceof Date
          ? this.formatarDataString(tarefa.dataConclusao)
          : tarefa.dataConclusao;

      return (
        (tarefa.servico && tarefa.servico.toLowerCase().includes(termoLower)) ||
        (tarefa.cliente && tarefa.cliente.toLowerCase().includes(termoLower)) ||
        (tarefa.atividade &&
          tarefa.atividade.toLowerCase().includes(termoLower)) ||
        (tarefa.prioridadeSelecionada &&
          tarefa.prioridadeSelecionada.toLowerCase().includes(termoLower)) ||
        (tarefa.obs && tarefa.obs.toLowerCase().includes(termoLower)) ||
        (tarefa.quem && tarefa.quem.toLowerCase().includes(termoLower)) ||
        (tarefa.financeiroSelecionada &&
          tarefa.financeiroSelecionada.toLowerCase().includes(termoLower)) ||
        (termoEhData &&
          ((data && data.includes(termoISO)) ||
            (dataConclusao && dataConclusao.includes(termoISO))))
      );
    });
  }

  private converterDataParaISO(dataStr: string): string {
    const regex = /^(\d{2})[\/\-](\d{2})[\/\-](\d{4})$/;
    const match = dataStr.match(regex);
    if (match) {
      const [, dia, mes, ano] = match;
      return `${ano}-${mes}-${dia}`;
    }
    return '';
  }

  private formatarDataString(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
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
        if (
          this.dataConclusaoAtual != tarefa.dataConclusao &&
          tarefa.servico === 'Mensal'
        ) {
          const dataProximaTarefa = this.somarMesMaisUm(tarefa.data);
          tarefa.data = dataProximaTarefa;
          tarefa.dataConclusao = '';
          tarefa.quem = '';
          await this.firestoreService.addTarefa(tarefa);
          console.log('Tarefa subsequente cadastrada com sucesso:', tarefa);
        }
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

  somarMesMaisUm(data: string | Date) {
    // const dataOriginal = '2025-06-09';
    const dataParaSomaMes = new Date(data);

    // somar 1 mês
    dataParaSomaMes.setMonth(dataParaSomaMes.getMonth() + 1);

    // formatar de volta para yyyy-MM-dd
    const resultado = dataParaSomaMes.toISOString().split('T')[0];
    console.log(resultado); // 2025-07-09
    return resultado;
  }

  handleModalClose(result: any) {
    console.log('Resultado da modal:', result);
    this.mostrarModal = false;
    this.mostrarModalEditar = false;
  }

  dataConclusaoAtual: any;
  editarProduto(produto: Tarefa): void {
    console.log('Editar:', produto);
    this.tarefaEmEdicao = { ...produto }; // Faz uma cópia para não editar diretamente
    this.mostrarModal = true;
    this.mostrarModalEditar = true;
    this.dataConclusaoAtual = produto.dataConclusao;
    console.log('Data de Conclusão atual:', this.dataConclusaoAtual);
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
//     data: 'Data',
//     servico: 'Serviço',
//     prioridadeSelecionada: 'Prioridade',
//     cliente: 'Cliente',
//     atividade: 'Atividade',
//     obs: 'Observações',
//     quem: 'Responsável',
//     dataConclusao: 'Conclusão',
//     statusSelecionada: 'Status',
//     financeiroSelecionada: 'Financeiro',
//     // valor: 'Valor',
//     valorNumerico: 'Valor',

// abrirModal(): void {
//   this.mostrarModal = true;
//   this.mostrarModalEditar = true;
//   this.tarefaEmEdicao = null;
// }
