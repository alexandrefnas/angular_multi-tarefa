import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { FirestoreService, Tarefa } from '../../services/firestore.service';
import { ModalTarefasComponent } from '../../modal/modal-tarefas/modal-tarefas.component';
import { DataAleComponent } from '../../components/filds/data-ale/data-ale.component';
import { fail } from 'node:assert';
import { InputAleComponent } from '../../components/filds/input-ale/input-ale.component';

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
  // pesquisaPeriodo!: FormGroup;

  dataInicio: Date | null = null;
  dataFim: Date | null = null;

  linksAtalho = [
    { value: 'ABERTURA MEI',                        url: 'https://sso.acesso.gov.br/login?client_id=mei.receita.economia.gov.br&authorization_id=19746b6ddfa',    },
    { value: 'BAIXA CERTIFICADO DIGITAL',           url: 'https://emissao-online.soluti.com.br/issue/plugin',    },
    { value: 'BAIXA CNPJ ME',                       url: 'https://sso.acesso.gov.br/login?client_id=coletor-nacional.redesimservicos.rfb.gov.br&authorization_id=19746d12418',    },
    { value: 'BAIXA CNPJ MEI',                      url: 'https://sso.acesso.gov.br/login?client_id=mei.receita.economia.gov.br&authorization_id=19746a4625c',    },
    { value: 'CORRIGIR NFC REJEITADA',              url: 'https://oliversistemas.com.br/contabilidade/clientes/index?busca_simples=true&situacao=ativo ',    },
    { value: 'EMITIR NF',                           url: 'https://nfse.uberlandia.mg.gov.br/index.html#/',    },
    { value: 'EMITIR NFSE',                         url: 'https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional',    },
    { value: 'EMITIR NFSe MEI',                     url: 'https://sso.acesso.gov.br/login?client_id=nfse.gov.br&authorization_id=19746bea468',    },
    { value: 'EMITIR NF SIARE',                     url: 'https://www2.fazenda.mg.gov.br/sol/',    },
    { value: 'EMITIR FGTS',                         url: 'https://sso.acesso.gov.br/login?client_id=por-p-fgtsd.estaleiro.serpro.gov.br&authorization_id=19746aa9a10',    },
    { value: 'EMITIR BOLETO SEGURO VIDA',           url: 'https://cliente.portalpasi.com.br/login',    },
    { value: 'ENVIAR GUIAS INSS',                   url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/dasnsimei.app/Identificacao',    },
    { value: 'IMPORTAR XML DE COMPRA OLIVER',       url: 'https://oliversistemas.com.br/contabilidade/clientes/index?busca_simples=true&situacao=ativo ',    },
    { value: 'PARCELAMENTO MEI',                    url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Servicos/Grupo.aspx?grp=t&area=2 ',    },
    { value: 'REQUERIMENTO AUXÍLIO INSS',           url: 'https://www.gov.br/pt-br/temas/meu-inss',    },
    { value: 'REQUIREMENTO DE CERTIFICADO DIGITAL', url: 'https://www.seguraonline.com.br/parceiros/',    },
    { value: 'SALVA CHAVE NF COMPRAS',              url: 'https://www.nfe.fazenda.gov.br/portal/principal.aspx',    },
    { value: 'SEGURO DESEMPREGO',                   url: 'https://sd.maisemprego.mte.gov.br/sdweb/empregadorweb/index.jsf',    },
  ];

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
    cliente: '150px',
    atividade: 'auto',
    obs: 'auto',
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
    // statusSelecionada: 'Status',
    // financeiroSelecionada: 'Financeiro',
    // valor: 'Valor',
    // valorNumerico: 'Valor',
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
    // 'statusSelecionada',
    // 'financeiroSelecionada',
    // 'valor',
    // 'valorNumerico',
  ];

  formatoProdutos = {
    // valor: 'moeda',
    valorNumerico: 'moeda',
    data: 'data',
    dataConclusao: 'data',
  } as const;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private firestoreService: FirestoreService
  ) {}

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

  // private formatarDataISO(date: Date): string {
  //   return date.toISOString().slice(0, 10); // Retorna '2025-05-29'
  // }

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
          // const financeiroVazio =
          //   !tarefa.financeiroSelecionada ||
          //   tarefa.financeiroSelecionada === '';
          // const valorMaiorQueZero = tarefa.valorNumerico > 0;
          // // console.log(tarefa.valorNumerico);
          // if (dataConclusaoVazia) {
          //   return valorMaiorQueZero ? financeiroVazio : true;
          // } else {
          //   return valorMaiorQueZero ? financeiroVazio : false;
          // }
          return dataConclusaoVazia;
        });
        // console.log('Exibindo tarefas com todos os filtros aplicados.');
      }
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

  private filtrarPorPesquisa(tarefas: any[], termo: string): any[] {
    if (!termo || termo.trim() === '') {
      return tarefas;
    }

    const termoLower = termo.toLowerCase();

    return tarefas.filter((tarefa) => {
      return (
        (tarefa.servico && tarefa.servico.toLowerCase().includes(termoLower)) ||
        (tarefa.cliente && tarefa.cliente.toLowerCase().includes(termoLower)) ||
        (tarefa.atividade &&
          tarefa.atividade.toLowerCase().includes(termoLower)) ||
        (tarefa.prioridadeSelecionada &&
          tarefa.prioridadeSelecionada.toLowerCase().includes(termoLower)) ||
        (tarefa.data &&
          tarefa.data.toString().toLowerCase().includes(termoLower)) ||
        (tarefa.obs &&
          tarefa.obs.toString().toLowerCase().includes(termoLower)) ||
        (tarefa.quem &&
          tarefa.quem.toString().toLowerCase().includes(termoLower)) ||
        (tarefa.financeiroSelecionada &&
          tarefa.financeiroSelecionada
            .toString()
            .toLowerCase()
            .includes(termoLower))
      );
    });
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

  private formatarDataString(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
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
