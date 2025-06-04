import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ale-input-decimal-ale',
  imports: [NgIf],
  templateUrl: './input-decimal-ale.component.html',
  styleUrl: './input-decimal-ale.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDecimalAleComponent),
      multi: true,
    },
  ],
})
export class InputDecimalAleComponent implements OnChanges {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() errorMessage: string = 'Este campo é obrigatório';
  @Input() onlyNumbers: boolean = false;
  @Input() maskType: 'cpf' | 'cnpj' | 'money' | 'cep' | 'phone' | '' = '';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>(); // Valor Formato
  @Output() rawValueChange = new EventEmitter<number>(); // Valor Limpo (ex: 1234.56)

  @Input() isFocused: boolean = false;
  formattedValue: string = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.formattedValue = this.applyMask(this.value || '');
    }
  }

  writeValue(value: string): void {
    this.value = value;
    this.formattedValue = this.applyMask(value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implementar se quiser suportar desabilitado
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value;
    const masked = this.applyMask(rawValue);
    this.formattedValue = masked;
    this.value = masked;
    this.valueChange.emit(masked);

    // Emitir o valor numérico limpo (ex: 12345.67)
    const rawNumeric = this.extractNumericValue(masked);
    this.rawValueChange.emit(rawNumeric);

    this.onChange(masked);
    this.onTouched();
  }

  extractNumericValue(masked: string): number {
    if (this.maskType === 'money') {
      const cleaned = masked.replace(/[^\d]/g, '');
      const numeric = parseFloat(cleaned) / 100;
      return isNaN(numeric) ? 0 : numeric;
    }

    // Caso queira usar para outras máscaras no futuro
    return parseFloat(masked.replace(/[^\d]/g, '')) || 0;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.onlyNumbers || this.maskType) {
      const allowedKeys = [
        'Backspace',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'Delete',
      ];
      const isNumber = /^[0-9]$/.test(event.key);
      const isAllowed = allowedKeys.includes(event.key);

      if (!isNumber && !isAllowed) {
        event.preventDefault();
      }
    }
  }

  hasError(): boolean {
    return this.required && !this.value;
  }

  applyMask(value: string): string {
    switch (this.maskType) {
      case 'money':
        return this.applyMoneyMask(value);
      case 'cpf':
        return this.applyCpfMask(value);
      case 'cnpj':
        return this.applyCnpjMask(value);
      case 'cep':
        return this.applyCepMask(value);
      case 'phone':
        return this.applyPhoneMask(value);
      default:
        return value;
    }
  }

  applyMoneyMask(value: string): string {
    value = value.replace(/\D/g, '');

    // Remove zeros à esquerda
    value = value.replace(/^0+/, '');

    // Garante pelo menos 3 dígitos para formatar centavos corretamente
    while (value.length < 3) {
      value = '0' + value;
    }

    const cents = value.slice(-2);
    const reais = value.slice(0, -2);
    const reaisFormatted = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return 'R$ ' + reaisFormatted + ',' + cents;
  }

  applyCpfMask(value: string): string {
    value = value.replace(/\D/g, '').slice(0, 11);
    return value
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  applyCnpjMask(value: string): string {
    value = value.replace(/\D/g, '').slice(0, 14);
    return value
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  applyCepMask(value: string): string {
    value = value.replace(/\D/g, '').slice(0, 8);
    return value.replace(/(\d{5})(\d)/, '$1-$2');
  }

  applyPhoneMask(value: string): string {
    value = value.replace(/\D/g, '').slice(0, 11);
    return value
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
}
