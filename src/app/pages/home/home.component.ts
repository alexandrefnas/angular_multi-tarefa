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
    {
      texto: 'Emissão NF Simples',
      url: 'https://www8.receita.fazenda.gov.br/simplesnacional/',
    },
    { texto: 'Emissão NF Mei', url: '' },
    { texto: 'eCac', url: '' },
    { texto: 'Conferir CNPJ', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
    { texto: 'Outros', url: '' },
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
