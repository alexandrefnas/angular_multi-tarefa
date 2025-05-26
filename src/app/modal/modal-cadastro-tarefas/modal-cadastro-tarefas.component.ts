import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ale-modal-cadastro-tarefas',
  imports: [
    ReactiveFormsModule,
    SelectAleComponent,
    InputDecimalAleComponent,
    ButtonComponent,
    DataAleComponent,
    InputAleComponent,
    RouterModule,
  ],
  templateUrl: './modal-cadastro-tarefas.component.html',
  styleUrl: './modal-cadastro-tarefas.component.css',
})
export class ModalCadastroTarefasComponent {
  cadastroTarefas: FormGroup;
  valorNumerico: number = 0;

  @Input() title: string = 'Título';
  @Input() message: string = 'Mensagem da modal';
  @Input() closeOnBackdrop: boolean = true;
  @Input() linkUrl: string = '/';
  @Output() onClose = new EventEmitter<boolean>();

  private dbService = inject(NgxIndexedDBService);

  constructor(private fb: FormBuilder) {
    this.cadastroTarefas = this.fb.group({
      data: [new Date(), Validators.required],
      servico: [''],
      prioridadeSelecionada: [''],
      cliente: ['', Validators.required],
      atividade: ['', Validators.required],
      obs: [''],
      quem: [''],
      statusSelecionada: [''],
      financeiroSelecionada: [''],
      valor: ['0'],
      valorNumerico: [''],
    });
  }

  // confirm() {
  //   this.onClose.emit(true);
  // }

  salvar() {
    if (!this.cadastroTarefas.valid) {
      console.log('Formulário inválido. Preencha os campos obrigatórios.');
      return;
    }

    const dados = this.cadastroTarefas.value;
    this.dbService.add('tarefas', dados).subscribe({
      next: (key) => {
        console.log('Tarefa salva com ID:', key);
        this.cancelar();
      },
      error: (error) => {
        console.error('Erro ao salvar tarefa:', error);
      },
    });
    // console.log('Salvando dados:', dados);
    // this.cancel();
  }

  cancel() {
    this.onClose.emit(false);
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
      statusSelecionada: '',
      financeiroSelecionada: '',
      valor: '0',
      valorNumerico: 0,
    });

    this.valorNumerico = 0;
    // this.onClose.emit(false);
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

  lista1 = [
    { value: ' ', label: ' ' },
    { value: 'Alta', label: 'Alta' },
    { value: 'Moderado', label: 'Moderado' },
    { value: 'Baixa', label: 'Baixa' },
  ];

  lista2 = [
    { value: '', label: '' },
    { value: 'Feito', label: 'Feito' },
  ];

  lista3 = [
    { value: '', label: '' },
    { value: 'Pago', label: 'Pago' },
  ];
}
