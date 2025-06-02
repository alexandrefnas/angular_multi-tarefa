import { Component } from '@angular/core';
import { ChartPieComponent } from '../../components/charts/chart-pie/chart-pie.component';
import { map, Observable } from 'rxjs';
import {
  FirestoreService,
  Tarefa,
  TarefaCount,
} from '../../services/firestore.service';
// import { ButtonComponent } from '../../components/button/button.component';
// import { NgIf } from '@angular/common';
// import { ModalCadastroTarefasComponent } from '../../modal/modal-cadastro-tarefas/modal-cadastro-tarefas.component';
// import { RouterModule } from '@angular/router';

@Component({
  selector: 'ale-home',
  imports: [ChartPieComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  graficoDados$: Observable<{ name: string; value: number }[]>;

  constructor(private firestoreService: FirestoreService) {
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

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
