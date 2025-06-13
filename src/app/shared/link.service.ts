import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
 links = [
    {
      value: 'ABERTURA MEI',
      url: 'https://sso.acesso.gov.br/login?client_id=mei.receita.economia.gov.br&authorization_id=19746b6ddfa',
    },
    {
      value: 'BAIXA CERTIFICADO DIGITAL',
      url: 'https://emissao-online.soluti.com.br/issue/plugin',
    },
    {
      value: 'BAIXA CNPJ ME',
      url: 'https://sso.acesso.gov.br/login?client_id=coletor-nacional.redesimservicos.rfb.gov.br&authorization_id=19746d12418',
    },
    {
      value: 'BAIXA CNPJ MEI',
      url: 'https://sso.acesso.gov.br/login?client_id=mei.receita.economia.gov.br&authorization_id=19746a4625c',
    },
    {
      value: 'BAIXA XML NF COMPRAS',
      url: 'https://meu.inpi.gov.br/pag/',
    },
    {
      value: 'CANCELAMENTO EXTEPORANIO',
      url: 'https://www2.fazenda.mg.gov.br/sol/',
    },
    {
      value: 'CORRIGIR NFC REJEITADA',
      url: 'https://oliversistemas.com.br/contabilidade/clientes/index?busca_simples=true&situacao=ativo ',
    },
    {
      value: 'DOCUMETAÇÃO MRV',
      url: 'https://bpoacnbrprod.service-now.com/mrv_portal_terceiros',
    },
    {
      value: 'EMISSÃO DE NF',
      url: 'https://nfse.uberlandia.mg.gov.br/index.html#/',
    },
    {
      value: 'EMISSÃO DE NFSE',
      url: 'https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional',
    },
    {
      value: 'EMISSÃO DE NFSe MEI',
      url: 'https://sso.acesso.gov.br/login?client_id=nfse.gov.br&authorization_id=19746bea468',
    },
    {
      value: 'EMISSÃO DE NF SIARE',
      url: 'https://www2.fazenda.mg.gov.br/sol/',
    },
    {
      value: 'EMITIR BOLETO SEGURO DE VIDA',
      url: 'https://cliente.portalpasi.com.br/login',
    },
    {
      value: 'EMITIR BOLETO SEGURO VIDA',
      url: 'https://cliente.portalpasi.com.br/login',
    },
    {
      value: 'EMITIR CERTIFICADO DIGITAL',
      url: 'https://emissao-online.soluti.com.br/issue/plugin',
    },
    {
      value: 'EMITIR GUIA FGTS',
      url: 'https://fgtsdigital.sistema.gov.br/portal/login',
    },
    {
      value: 'EMITIR FGTS',
      url: 'https://sso.acesso.gov.br/login?client_id=por-p-fgtsd.estaleiro.serpro.gov.br&authorization_id=19746aa9a10',
    },
    {
      value: 'ENVIAR GUIAS INSS',
      url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/dasnsimei.app/Identificacao',
    },
    {
      value: 'IMPORTAR XML DE COMPRA OLIVER',
      url: 'https://oliversistemas.com.br/contabilidade/clientes/index?busca_simples=true&situacao=ativo ',
    },
    {
      value: 'NEGOCIAÇÃO ME',
      url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Servicos/Grupo.aspx?grp=t&area=2',
    },
    {
      value: 'PARCELAMENTO DIVIDA ATIVA',
      url: 'https://www.regularize.pgfn.gov.br',
    },
    {
      value: 'PARCELAMENTO MEI',
      url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Servicos/Grupo.aspx?grp=t&area=2 ',
    },
    {
      value: 'REGISTRO DE MARCA',
      url: 'https://www.nfe.fazenda.gov.br/portal/principal.aspx',
    },
    {
      value: 'RENOVA CERTIFICADO DIGITAL',
      url: 'https://www.seguraonline.com.br/parceiros/',
    },
    {
      value: 'REQUERIMENTO AUXÍLIO INSS',
      url: 'https://www.gov.br/pt-br/temas/meu-inss',
    },
    {
      value: 'REQUIREMENTO DE CERTIFICADO DIGITAL',
      url: 'https://www.seguraonline.com.br/parceiros/',
    },
    {
      value: 'SALVA CHAVE NF COMPRAS',
      url: 'https://www.nfe.fazenda.gov.br/portal/principal.aspx',
    },
    {
      value: 'SEGURO DESEMPREGO',
      url: 'https://sd.maisemprego.mte.gov.br/sdweb/empregadorweb/index.jsf',
    },
  ];

  constructor() { }
}
