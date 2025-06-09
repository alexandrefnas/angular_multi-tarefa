import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts/types/dist/shared';
import type { PieSeriesOption } from 'echarts/charts';

// IMPORTAÇÃO DOS MÓDULOS NECESSÁRIOS
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import {
  FirestoreService,
  TarefaCount,
} from '../../../services/firestore.service';
import { Observable, Subscription } from 'rxjs';

echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);
// import { Subscription } from 'rxjs';

// REGISTRO DOS MÓDULOS
echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);

@Component({
  selector: 'ale-chart-pie',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css'],
  providers: [provideEchartsCore({ echarts })],
})
export class ChartPieComponent implements OnInit, OnChanges {
  /** ✅ Agora recebe um Observable de dados */
  @Input() data$!: Observable<{ name: string; value: number }[]>;

  /** Configurações visuais: */
  @Input() title: string = 'Título';
  @Input() legendColor: string = 'white';
  @Input() corLabelFormatter: string = 'white';
  @Input() labelShow: boolean = false;
  @Input() legendShow: boolean = false;

  /** ✅ NOVOS INPUTS: */
  @Input() colors: string[] = []; // Cores das fatias
  @Input() radius: [string, string] = ['40%', '70%']; // Raio interno e externo
  @Input() labelFormatter: string = '{c} ({d}%)'; // Formatter

  @Output() prioridadeSelecionada = new EventEmitter<string>();

  chartOption: EChartsOption = {};

  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscribeData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data$']) {
      this.subscribeData();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscribeData(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.data$) {
      this.subscription = this.data$.subscribe((data) => {
        this.setupChart(data);
      });
    }
  }

  private setupChart(data: { name: string; value: number; itemStyle?: any  }[]): void {
    this.chartOption = {
      color: this.colors.length ? this.colors : undefined, // ✅ Aplica se tiver
      tooltip: { trigger: 'item' },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: this.legendColor,
          fontSize: 14,
          fontWeight: 'bold',
        },
        show: this.legendShow,
      },
      series: [
        {
          name: this.title,
          type: 'pie',
          radius: this.radius,
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            formatter: this.labelFormatter,
            show: this.labelShow,
            backgroundColor: 'transparent',
            color: this.corLabelFormatter,
            fontWeight: 'bold',
          },
        } as PieSeriesOption,
      ],
    };
  }
  /** ✅ Método para capturar a instância do gráfico e escutar eventos */
  onChartInit(ec: any): void {
    ec.on('click', (params: any) => {
      console.log('Clicou no gráfico:', params);
      const prioridade = params.name; // O nome da prioridade
      this.prioridadeSelecionada.emit(prioridade);
    });
  }
}

// ngOnInit(): void {
//   this.loadData();
// }

// ngOnDestroy(): void {
//   if (this.subscription) {
//     this.subscription.unsubscribe();
//   }
// }

// loadData() {
//   this.subscription = this.firestoreService
//     .getContagemPorPrioridade()
//     .subscribe((counts: TarefaCount[]) => {
//       const pieData = counts.map((item) => ({
//         value: item.quantidade,
//         name: this.capitalize(item.prioridade),
//       }));

//       this.chartOption = {
//         ...this.chartOption,
//         series: [
//           {
//             name: 'Prioridade',
//             type: 'pie',
//             radius: ['40%', '70%'],
//             data: pieData,
//             emphasis: {
//               itemStyle: {
//                 shadowBlur: 10,
//                 shadowOffsetX: 0,
//                 shadowColor: 'rgba(0, 0, 0, 0.5)',
//               },
//             },
//             label: {
//               formatter: '{c} ({d}%)',
//               // formatter: '{b}: {c} ({d}%)',
//               show: false,
//             },
//           } as PieSeriesOption,
//         ],
//       };
//     });
// }

// private capitalize(text: string): string {
//   return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
// }
// }
