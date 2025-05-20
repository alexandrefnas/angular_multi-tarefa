import { Component } from '@angular/core';
import { InputAleComponent } from '../../components/filds/input-ale/input-ale.component';
import { DataAleComponent } from '../../components/filds/data-ale/data-ale.component';
import { SelectAleComponent } from '../../components/filds/select-ale/select-ale.component';
import { InputDecimalAleComponent } from '../../components/filds/input-decimal-ale/input-decimal-ale.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'ale-cadastro-tarefas',
  imports: [
    DataAleComponent,
    InputAleComponent,
    SelectAleComponent,
    InputDecimalAleComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css',
})
export class CadastroTarefasComponent {
  cadastroTarefas: FormGroup;

  valorNumerico: number = 0;

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

  salvar() {
    if (!this.cadastroTarefas.valid) {
      console.log('Formulário inválido. Preencha os campos obrigatórios.');
      return;
    }

    const dados = this.cadastroTarefas.value;
    console.log('Salvando dados:', dados);
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

  onRawValueChange(value: number): void {
    // this.valorNumerico = value;
    this.valorNumerico = value;
    this.cadastroTarefas.get('valorNumerico')?.setValue(value);
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
  }
}

// function ngOnInit() {
//   throw new Error('Function not implemented.');
// }
// ngOnInit(): void {
// this.data= new Date()
// this.cadastro = this.fb.group({
//   data: ['', [Validators.required]],
//   servico: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(2),
//       Validators.maxLength(256),
//     ],
//   ],
//   alerta: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(2),
//       Validators.maxLength(256),
//     ],
//   ],
//   cliente: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(2),
//       Validators.maxLength(256),
//     ],
//   ],
//   atividade: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(2),
//       Validators.maxLength(256),
//     ],
//   ],
//   obs: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(2),
//       Validators.maxLength(256),
//     ],
//   ],
//   quem: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(2),
//       Validators.maxLength(256),
//     ],
//   ],
//   status: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(2),
//       Validators.maxLength(256),
//     ],
//   ],
//   financeiro: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(2),
//       Validators.maxLength(256),
//     ],
//   ],
//   valor: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(2),
//       Validators.maxLength(256),
//     ],
//   ],
//   vencimento: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(2),
//       Validators.maxLength(256),
//     ],
//   ],
// });
// }
// salvar(): void {
//   const dados = {
//     data: this.data,
//     servico: this.servico,
//     prioridade: this.prioridadeSelecionada,
//     cliente: this.cliente,
//     atividade: this.atividade,
//     obs: this.obs,
//     quem: this.quem,
//     status: this.statusSelecionada,
//     financeiro: this.financeiroSelecionada,
//     valor: this.valorNumerico,
//     //valor: this.valor, // Esse é o valor formatado (ex: "R$ 1.234,56")
//     // Se quiser salvar o valor sem máscara, armazene ele também separadamente com rawValueChange
//     // Ex: valor: this.valorNumerico
//   };

//   //console.log('JSON do formulário:', dados);
// }
