import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
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

  @Input() lista1 = [
    { value: ' ', label: ' ' },
    { value: 'Alta', label: 'Alta' },
    { value: 'Moderado', label: 'Moderado' },
    { value: 'Baixa', label: 'Baixa' },
  ];

  @Input() lista2 = [
    { value: '', label: '' },
    { value: 'Feito', label: 'Feito' },
  ];

  @Input() lista3 = [
    { value: '', label: '' },
    { value: 'Pago', label: 'Pago' },
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
      data: [new Date(), Validators.required],
      servico: [''],
      prioridadeSelecionada: [''],
      cliente: ['', Validators.required],
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tarefaParaEditar'] && this.tarefaParaEditar) {
      this.cadastroTarefas.patchValue(this.tarefaParaEditar);
    }
  }

  salvar() {
    if (!this.cadastroTarefas.valid) {
      console.log('Formulário inválido. Preencha os campos obrigatórios.');
      return;
    }

    const tarefa: Tarefa = this.cadastroTarefas.value;

    // Apenas emite para o componente pai
    this.onSave.emit(tarefa);
    this.cancelar();
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
}
