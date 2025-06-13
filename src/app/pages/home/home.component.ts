import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartPieComponent } from '../../components/charts/chart-pie/chart-pie.component';
import { map, Observable } from 'rxjs';
import {
  FirestoreService,
  Tarefa,
  TarefaCount,
} from '../../services/firestore.service';
import { NgFor, NgIf } from '@angular/common';
import { LinkService } from '../../shared/link.service';

@Component({
  selector: 'ale-home',
  imports: [ChartPieComponent, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  graficoDados$: Observable<{ name: string; value: number }[]>;
  links: any[] = [];
  mostrarAcessoRapido = false;

  private toggleListener = () => {
    this.mostrarAcessoRapido = !this.mostrarAcessoRapido;
  };

  ngOnInit(): void {
    // Verifica se deve mostrar ao navegar
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as {
      mostrarAcessoRapido?: boolean;
    };
    if (state?.mostrarAcessoRapido) {
      this.mostrarAcessoRapido = true;
    }

    // Adiciona listener de toggle
    window.addEventListener('toggleAcessoRapido', this.toggleListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('toggleAcessoRapido', this.toggleListener);
  }

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private linkService: LinkService
  ) {
    this.links = this.linkService.links;

    const coresPorPrioridade: Record<string, string> = {
      Alta: '#ff0000',
      Moderado: '#FFFF00',
      Baixa: '#ffffff',
      'Sem prioridade': '#cccccc',
    };

    this.graficoDados$ = this.firestoreService.getTarefas().pipe(
      map((tarefas: Tarefa[]) =>
        tarefas.filter(
          (tarefa) => !tarefa.dataConclusao || tarefa.dataConclusao === ''
        )
      ),
      map((tarefasEmAberto: Tarefa[]) => {
        const counts: { [prioridade: string]: number } = {};
        tarefasEmAberto.forEach((tarefa) => {
          const prioridade = tarefa.prioridadeSelecionada || 'Sem prioridade';
          counts[prioridade] = (counts[prioridade] || 0) + 1;
        });

        return Object.keys(counts).map((prioridade) => ({
          name: this.capitalize(prioridade),
          value: counts[prioridade],
          itemStyle: {
            color: coresPorPrioridade[this.capitalize(prioridade)] || '#cccccc',
          },
        }));
      })
    );
  }

  // links = [
  //   {
  //     value: 'ABERTURA MEI',
  //     url: 'https://sso.acesso.gov.br/login?client_id=mei.receita.economia.gov.br&authorization_id=19746b6ddfa',
  //   },
  //   {
  //     value: 'BAIXA CERTIFICADO DIGITAL',
  //     url: 'https://emissao-online.soluti.com.br/issue/plugin',
  //   },
  //   {
  //     value: 'BAIXA CNPJ ME',
  //     url: 'https://sso.acesso.gov.br/login?client_id=coletor-nacional.redesimservicos.rfb.gov.br&authorization_id=19746d12418',
  //   },
  //   {
  //     value: 'BAIXA CNPJ MEI',
  //     url: 'https://sso.acesso.gov.br/login?client_id=mei.receita.economia.gov.br&authorization_id=19746a4625c',
  //   },
  //   {
  //     value: 'BAIXA XML NF COMPRAS',
  //     url: 'https://meu.inpi.gov.br/pag/',
  //   },
  //   {
  //     value: 'CANCELAMENTO EXTEPORANIO',
  //     url: 'https://www2.fazenda.mg.gov.br/sol/',
  //   },
  //   {
  //     value: 'CORRIGIR NFC REJEITADA',
  //     url: 'https://oliversistemas.com.br/contabilidade/clientes/index?busca_simples=true&situacao=ativo ',
  //   },
  //   {
  //     value: 'DOCUMETAÇÃO MRV',
  //     url: 'https://bpoacnbrprod.service-now.com/mrv_portal_terceiros',
  //   },
  //   {
  //     value: 'EMISSÃO DE NF',
  //     url: 'https://nfse.uberlandia.mg.gov.br/index.html#/',
  //   },
  //   {
  //     value: 'EMISSÃO DE NFSE',
  //     url: 'https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional',
  //   },
  //   {
  //     value: 'EMISSÃO DE NFSe MEI',
  //     url: 'https://sso.acesso.gov.br/login?client_id=nfse.gov.br&authorization_id=19746bea468',
  //   },
  //   {
  //     value: 'EMISSÃO DE NF SIARE',
  //     url: 'https://www2.fazenda.mg.gov.br/sol/',
  //   },
  //   {
  //     value: 'EMITIR BOLETO SEGURO DE VIDA',
  //     url: 'https://cliente.portalpasi.com.br/login',
  //   },
  //   {
  //     value: 'EMITIR BOLETO SEGURO VIDA',
  //     url: 'https://cliente.portalpasi.com.br/login',
  //   },
  //   {
  //     value: 'EMITIR CERTIFICADO DIGITAL',
  //     url: 'https://emissao-online.soluti.com.br/issue/plugin',
  //   },
  //   {
  //     value: 'EMITIR GUIA FGTS',
  //     url: 'https://fgtsdigital.sistema.gov.br/portal/login',
  //   },
  //   {
  //     value: 'EMITIR FGTS',
  //     url: 'https://sso.acesso.gov.br/login?client_id=por-p-fgtsd.estaleiro.serpro.gov.br&authorization_id=19746aa9a10',
  //   },
  //   {
  //     value: 'ENVIAR GUIAS INSS',
  //     url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/dasnsimei.app/Identificacao',
  //   },
  //   {
  //     value: 'IMPORTAR XML DE COMPRA OLIVER',
  //     url: 'https://oliversistemas.com.br/contabilidade/clientes/index?busca_simples=true&situacao=ativo ',
  //   },
  //   {
  //     value: 'NEGOCIAÇÃO ME',
  //     url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Servicos/Grupo.aspx?grp=t&area=2',
  //   },
  //   {
  //     value: 'PARCELAMENTO DIVIDA ATIVA',
  //     url: 'https://www.regularize.pgfn.gov.br',
  //   },
  //   {
  //     value: 'PARCELAMENTO MEI',
  //     url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Servicos/Grupo.aspx?grp=t&area=2 ',
  //   },
  //   {
  //     value: 'REGISTRO DE MARCA',
  //     url: 'https://www.nfe.fazenda.gov.br/portal/principal.aspx',
  //   },
  //   {
  //     value: 'RENOVA CERTIFICADO DIGITAL',
  //     url: 'https://www.seguraonline.com.br/parceiros/',
  //   },
  //   {
  //     value: 'REQUERIMENTO AUXÍLIO INSS',
  //     url: 'https://www.gov.br/pt-br/temas/meu-inss',
  //   },
  //   {
  //     value: 'REQUIREMENTO DE CERTIFICADO DIGITAL',
  //     url: 'https://www.seguraonline.com.br/parceiros/',
  //   },
  //   {
  //     value: 'SALVA CHAVE NF COMPRAS',
  //     url: 'https://www.nfe.fazenda.gov.br/portal/principal.aspx',
  //   },
  //   {
  //     value: 'SEGURO DESEMPREGO',
  //     url: 'https://sd.maisemprego.mte.gov.br/sdweb/empregadorweb/index.jsf',
  //   },
  // ];

  onPrioridadeSelecionada(prioridade: string) {
    console.log('Prioridade recebida:', prioridade);

    // ✅ Armazena no localStorage ou usa serviço para enviar para página tarefas
    localStorage.setItem('prioridadeSelecionada', prioridade);

    // ✅ Ou redireciona automaticamente:
    this.router.navigate(['/tarefas']);
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
