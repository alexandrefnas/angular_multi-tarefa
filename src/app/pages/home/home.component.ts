import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartPieComponent } from '../../components/charts/chart-pie/chart-pie.component';
import { map, Observable } from 'rxjs';
import {
  FirestoreService,
  Tarefa,
  TarefaCount,
} from '../../services/firestore.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'ale-home',
  imports: [ChartPieComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  graficoDados$: Observable<{ name: string; value: number }[]>;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.graficoDados$ = this.firestoreService.getTarefas().pipe(
      map((tarefas: Tarefa[]) =>
        // Primeiro: filtra apenas tarefas em aberto
        tarefas.filter(
          (tarefa) => !tarefa.dataConclusao || tarefa.dataConclusao === ''
        )
      ),
      map((tarefasEmAberto: Tarefa[]) => {
        // Agrupa e conta as prioridades
        const counts: { [prioridade: string]: number } = {};
        tarefasEmAberto.forEach((tarefa) => {
          const prioridade = tarefa.prioridadeSelecionada || 'Sem prioridade';
          counts[prioridade] = (counts[prioridade] || 0) + 1;
        });

        // Transforma em array de objetos para o gráfico
        return Object.keys(counts).map((prioridade) => ({
          name: this.capitalize(prioridade),
          value: counts[prioridade],
        }));
      })
    );
  }

  links = [
    // { texto: 'Emissão NFSe',      url: 'https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional',    },
    // { texto: 'Emissão NFe', url: 'https://nfse.uberlandia.mg.gov.br/index.html#/' },
    // { texto: 'eCAC', url: 'https://cav.receita.fazenda.gov.br/autenticacao/login' },
    // { texto: 'Conferir CNPJ', url: 'https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_solicitacao.asp' },
    // { texto: 'SIARE', url: 'https://www2.fazenda.mg.gov.br/sol/' },
    // { texto: 'Oliver', url: 'https://oliversistemas.com.br/contabilidade/inicio' },
    // { texto: 'Imprimir DASN', url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/dasnsimei.app/Identificacao' },
    // { texto: 'Outros', url: '' },
    // { texto: 'Outros', url: '' },

    { texto: 'ABERTURA MEI',                        url: 'https://sso.acesso.gov.br/login?client_id=mei.receita.economia.gov.br&authorization_id=19746b6ddfa',    },
    { texto: 'BAIXA CERTIFICADO DIGITAL',           url: 'https://emissao-online.soluti.com.br/issue/plugin',    },
    { texto: 'BAIXA CNPJ ME',                       url: 'https://sso.acesso.gov.br/login?client_id=coletor-nacional.redesimservicos.rfb.gov.br&authorization_id=19746d12418',    },
    { texto: 'BAIXA CNPJ MEI',                      url: 'https://sso.acesso.gov.br/login?client_id=mei.receita.economia.gov.br&authorization_id=19746a4625c',    },
    { texto: 'CORRIGIR NFC REJEITADA',              url: 'https://oliversistemas.com.br/contabilidade/clientes/index?busca_simples=true&situacao=ativo ',    },
    { texto: 'EMISSÃO DE NF',                       url: 'https://nfse.uberlandia.mg.gov.br/index.html#/',    },
    { texto: 'EMISSÃO DE NFSE',                     url: 'https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional',    },
    { texto: 'EMISSÃO DE NFSe MEI',                 url: 'https://sso.acesso.gov.br/login?client_id=nfse.gov.br&authorization_id=19746bea468',    },
    { texto: 'EMISSÃO DE NF SIARE',                 url: 'https://www2.fazenda.mg.gov.br/sol/',    },
    { texto: 'EMITIR FGTS',                         url: 'https://sso.acesso.gov.br/login?client_id=por-p-fgtsd.estaleiro.serpro.gov.br&authorization_id=19746aa9a10',    },
    { texto: 'EMITIR BOLETO SEGURO VIDA',           url: 'https://cliente.portalpasi.com.br/login',    },
    { texto: 'ENVIAR GUIAS INSS',                   url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/dasnsimei.app/Identificacao',    },
    { texto: 'IMPORTAR XML DE COMPRA OLIVER',       url: 'https://oliversistemas.com.br/contabilidade/clientes/index?busca_simples=true&situacao=ativo ',    },
    { texto: 'PARCELAMENTO MEI',                    url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Servicos/Grupo.aspx?grp=t&area=2 ',    },
    { texto: 'REQUERIMENTO AUXÍLIO INSS',           url: 'https://www.gov.br/pt-br/temas/meu-inss',    },
    { texto: 'REQUIREMENTO DE CERTIFICADO DIGITAL', url: 'https://www.seguraonline.com.br/parceiros/',    },
    { texto: 'SALVA CHAVE NF COMPRAS',              url: 'https://www.nfe.fazenda.gov.br/portal/principal.aspx',    },
    { texto: 'SEGURO DESEMPREGO',                   url: 'https://sd.maisemprego.mte.gov.br/sdweb/empregadorweb/index.jsf',    },
  ];

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
