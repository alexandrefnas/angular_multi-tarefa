import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { InputAleComponent } from '../../components/filds/input-ale/input-ale.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputDecimalAleComponent } from '../../components/filds/input-decimal-ale/input-decimal-ale.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SelectAleComponent } from '../../components/filds/select-ale/select-ale.component';
import { DataAleComponent } from '../../components/filds/data-ale/data-ale.component';
import { Clientepj, FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'ale-modal-clientepj',
  imports: [
    NgIf,
    ReactiveFormsModule,
    InputAleComponent,
    InputDecimalAleComponent,
    ButtonComponent,
    SelectAleComponent,
    DataAleComponent,
  ],
  templateUrl: './modal-clientepj.component.html',
  styleUrl: './modal-clientepj.component.css',
})
export class ModalClientepjComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() closeOnBackdrop: boolean = true;
  @Input() title: string = 'Título';

  @Input() somenteVisualizacao: boolean = false;

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<Clientepj>();

  @Input() clienteParaEditar: Clientepj | null = null;


  listNaturezaJuridica = [
    { value: 'LTDA', label: 'LTDA' },
    { value: 'EMPRESÁRIO INDIVIDUAL', label: 'EMPRESÁRIO INDIVIDUAL' },
  ];

  listAtividade = [
    { value: 'COMÉRCIO', label: 'COMÉRCIO' },
    { value: 'INDÚSTRIA', label: 'INDÚSTRIA' },
    { value: 'SERVIÇO', label: 'SERVIÇO' },
    { value: 'COMÉRCIO E SERVIÇO', label: 'COMÉRCIO E SERVIÇO' },
    { value: 'COMÉRCIO E INDÚSTRIA', label: 'COMÉRCIO E INDÚSTRIA' },
    {
      value: 'COMÉRCIO, SERVIÇO E INDÚSTRIA',
      label: 'COMÉRCIO, SERVIÇO E INDÚSTRIA',
    },
  ];

  listTributacao = [
    { value: 'LUCRO PREZUMIDO', label: 'LUCRO PREZUMIDO' },
    { value: 'LUCRO REAL', label: 'LUCRO REAL' },
    { value: 'MEI', label: 'MEI' },
    { value: 'SIMPLES', label: 'SIMPLES' },
  ];

  cadastroCliente: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService
  ) {
    this.cadastroCliente = this.fb.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      cnpj: ['', Validators.required],
      inscricaoEstadual: [''],
      naturezaJuridica: [''],
      atividade: [''],
      tributacao: [''],
      inicioAtividade: [''],
      clienteDesde: [''],
      nomeResponsavel: [''],
      cpf: [''],
      fone: [''],
      email: [''],
      senhaGov: [''],
      usuarioSiare: [''],
      senhaSiare: [''],
      caminhoPasta: [''],
    });
  }

  getControl(controlName: string): FormControl {
    return this.cadastroCliente.get(controlName) as FormControl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clienteParaEditar'] || changes['somenteVisualizacao']) {
      if (this.clienteParaEditar) {
        this.cadastroCliente.patchValue({
          ...this.clienteParaEditar,
          inicioAtividade: this.converterParaInputDate(
            this.clienteParaEditar.inicioAtividade
          ),
          clienteDesde: this.converterParaInputDate(
            this.clienteParaEditar.clienteDesde
          ),
        });

        if (this.somenteVisualizacao) {
          this.cadastroCliente.disable();
        } else {
          this.cadastroCliente.enable();
        }
      } else {
        this.cadastroCliente.reset();
        this.cadastroCliente.enable();
      }
    }
  }

  onBackdropClick() {
    if (this.closeOnBackdrop) {
      this.cancel();
    }
  }

  salvar() {
    if (!this.cadastroCliente.valid) {
      this.cadastroCliente.markAllAsTouched();
      console.log('Formulário inválido. Preencha os campos obrigatórios.');
      return;
    }

    const baseData = {
      ...this.cadastroCliente.value,
      inicioAtividade: this.formatarDataString(
        new Date(this.cadastroCliente.value.inicioAtividade)
      ),
      clienteDesde: this.cadastroCliente.value.clienteDesde
        ? this.formatarDataString(
            new Date(this.cadastroCliente.value.clienteDesde)
          )
        : '',
    };

    if (this.clienteParaEditar) {
      // Edição
      const clientepj: Clientepj = {
        ...baseData,
        id: this.clienteParaEditar.id,
      };
      this.firestoreService
        .updateClientepj(clientepj.id!, clientepj)
        .then(() => {
          this.onSave.emit(clientepj);
          this.close();
        });
    } else {
      // Cadastro
      const clientepj: Clientepj = baseData;
      this.firestoreService.addCadastroClientepj(clientepj).then(() => {
        this.onSave.emit(clientepj);
        this.close();
      });
    }
  }

  private converterParaInputDate(valor: string | Date | undefined): string {
    if (!valor) return '';
    const data = new Date(valor);
    return data.toISOString().substring(0, 10); // formato YYYY-MM-DD
  }

  private formatarDataString(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  close(): void {
    this.cadastroCliente.reset();
    this.cancel();
  }

  cancel() {
    this.onClose.emit(false);
  }
}
