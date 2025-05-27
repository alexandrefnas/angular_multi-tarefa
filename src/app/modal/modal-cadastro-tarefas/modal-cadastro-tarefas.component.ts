import { Component, EventEmitter, Input, Output } from '@angular/core';
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

@Component({
  selector: 'ale-modal-cadastro-tarefas',
  imports: [
    ReactiveFormsModule,
    SelectAleComponent,
    InputDecimalAleComponent,
    ButtonComponent,
    DataAleComponent,
    InputAleComponent,
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

  @Output() onClose = new EventEmitter<boolean>();

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

  // confirm() {
  //   this.onClose.emit(true);
  // }

  cancel() {
    this.onClose.emit(false);
  }

  salvar() {
    if (!this.cadastroTarefas.valid) {
      console.log('Formulário inválido. Preencha os campos obrigatórios.');
      return;
    }

    const tarefa: Tarefa = this.cadastroTarefas.value;

    this.firestoreService
      .addTarefa(tarefa)
      .then(() => {
        console.log('Tarefa salva com sucesso!');
        alert('Tarefa salva com sucesso!');
        this.cancelar();
      })
      .catch((error) => {
        console.error('Erro ao salvar tarefa:', error);
        alert('Erro ao salvar tarefa!');
      });
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
    { value: 'alta', label: 'Alta' },
    { value: 'moderado', label: 'Moderado' },
    { value: 'baixa', label: 'Baixa' },
  ];

  lista2 = [
    { value: '', label: '' },
    { value: 'feito', label: 'Feito' },
  ];

  lista3 = [
    { value: '', label: '' },
    { value: 'pago', label: 'Pago' },
  ];
}
