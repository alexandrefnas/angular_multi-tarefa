import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectAleComponent } from '../../components/filds/select-ale/select-ale.component';
import { InputDecimalAleComponent } from '../../components/filds/input-decimal-ale/input-decimal-ale.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DataAleComponent } from '../../components/filds/data-ale/data-ale.component';
import { InputAleComponent } from '../../components/filds/input-ale/input-ale.component';
import { FirestoreService, Tarefa } from '../../services/firestore.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ale-modal-tarefas',
  imports: [
    NgIf,
    ReactiveFormsModule,
    SelectAleComponent,
    InputDecimalAleComponent,
    ButtonComponent,
    DataAleComponent,
    InputAleComponent,
  ],
  templateUrl: './modal-tarefas.component.html',
  styleUrl: './modal-tarefas.component.css',
})
export class ModalTarefasComponent {
  @Input() tarefaParaEditar: Tarefa | null = null;

  @Input() title: string = 'Título';
  @Input() message: string = 'Mensagem da modal';
  @Input() closeOnBackdrop: boolean = true;
  @Input() visible: boolean = false;

  servicos = [
    { value: 'Mensal', label: 'Mensal' },
  ];

  @Input() lista1 = [
    { value: 'Alta', label: 'Alta' },
    { value: 'Moderado', label: 'Moderado' },
    { value: 'Baixa', label: 'Baixa' },
  ];

  @Input() lista2 = [
    { value: '', label: '' },
    { value: 'FEITO', label: 'FEITO' },
  ];

  @Input() lista3 = [
    { value: '', label: '' },
    { value: 'PAGO', label: 'PAGO' },
  ];

  @Input() lista4 = [
    { value: 'MECIO', label: 'MECIO' },
    { value: 'DOUGLAS', label: 'DOUGLAS' },
    { value: 'ALEXANDRE', label: 'ALEXANDRE' },
  ];

  atividades = [
    { value: 'ABERTURA MEI', label: 'ABERTURA MEI' },
    { value: 'BAIXA CNPJ ME', label: 'BAIXA CNPJ ME' },
    { value: 'BAIXA CNPJ MEI', label: 'BAIXA CNPJ MEI' },
    { value: 'CORRIGIR NFC REJEITADA', label: 'CORRIGIR NFC REJEITADA' },
    { value: 'DECLARAÇÃO IR PF', label: 'DECLARAÇÃO IR PF' },
    { value: 'EMISSÃO DE NF', label: 'EMISSÃO DE NF' },
    { value: 'EMISSÃO DE NFSE', label: 'EMISSÃO DE NFSE' },
    { value: 'ENVIAR GUIAS INSS', label: 'ENVIAR GUIAS INSS' },
    { value: 'IMPORTAR XML DE COMPRA', label: 'IMPORTAR XML DE COMPRA	' },
    { value: 'PARCELAMENTO MEI', label: 'PARCELAMENTO MEI' },
    { value: 'PREECHER CARNE LEÃO', label: 'PREECHER CARNE LEÃO' },
    { value: 'REQUERIMENTO AUXÍLIO INSS', label: 'REQUERIMENTO AUXÍLIO INSS' },
  ];

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<Tarefa>();

  cadastroTarefas: FormGroup;
  valorNumerico: number = 0;

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService
  ) {
    this.cadastroTarefas = this.fb.group({
      data: ['', Validators.required],
      servico: [''],
      prioridadeSelecionada: ['', Validators.required],
      cliente: [''],
      atividade: ['', Validators.required],
      obs: [''],
      quem: [''],
      dataConclusao: [''],
      statusSelecionada: [''],
      financeiroSelecionada: [''],
      valor: ['0'],
      valorNumerico: [''],
    });
  }

  // Getter para facilitar o acesso com cast para FormControl
  get servicoControl(): FormControl {
    return this.cadastroTarefas.get('servico') as FormControl;
  }

  get prioridadeControl(): FormControl {
    return this.cadastroTarefas.get('prioridadeSelecionada') as FormControl;
  }

  get atividadeControl(): FormControl {
    return this.cadastroTarefas.get('atividade') as FormControl;
  }
  get quemContol(): FormControl {
    return this.cadastroTarefas.get('quem') as FormControl;
  }
  get statusSelecionadaControl(): FormControl {
    return this.cadastroTarefas.get('statusSelecionada') as FormControl;
  }
  get financeiroSelecionadaControl(): FormControl {
    return this.cadastroTarefas.get('financeiroSelecionada') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tarefaParaEditar'] && this.tarefaParaEditar) {
      const tarefa = { ...this.tarefaParaEditar };

      if (typeof tarefa.data === 'string') {
        const [ano, mes, dia] = tarefa.data.split('-').map(Number);
        tarefa.data = new Date(ano, mes - 1, dia); // data local, sem fuso
      }

      if (typeof tarefa.dataConclusao === 'string' && tarefa.dataConclusao) {
        const [ano, mes, dia] = tarefa.dataConclusao.split('-').map(Number);
        tarefa.dataConclusao = new Date(ano, mes - 1, dia);
      }

      this.cadastroTarefas.patchValue(tarefa);
    }
  }

  salvar() {
    if (!this.cadastroTarefas.valid) {
      console.log('Formulário inválido. Preencha os campos obrigatórios.');
      this.cadastroTarefas.markAllAsTouched();
      return;
    }

    const tarefa: Tarefa = {
      ...this.cadastroTarefas.value,
      data: this.formatarDataString(new Date(this.cadastroTarefas.value.data)),
      dataConclusao: this.cadastroTarefas.value.dataConclusao
        ? this.formatarDataString(this.cadastroTarefas.value.dataConclusao)
        : '',
    };

    this.onSave.emit(tarefa);
    this.cancelar();
  }

  private formatarDataString(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  cancelar(): void {
    this.cadastroTarefas.reset({
      data: new Date(),
      servico: '',
      prioridadeSelecionada: '',
      cliente: '',
      atividade: '',
      obs: '',
      quem: '',
      dataConclusao: '',
      statusSelecionada: '',
      financeiroSelecionada: '',
      valor: '0',
      valorNumerico: 0,
    });

    this.valorNumerico = 0;
    this.cancel();
  }

  onRawValueChange(value: number): void {
    // this.valorNumerico = value;
    this.valorNumerico = value;
    this.cadastroTarefas.get('valorNumerico')?.setValue(value);
  }

  onBackdropClick() {
    if (this.closeOnBackdrop) {
      this.cancel();
    }
  }

  cancel() {
    this.onClose.emit(false);
  }

  private formatarData(date: Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${ano}-${mes}-${dia}`; // Exemplo: '2025-05-29'
  }
}
