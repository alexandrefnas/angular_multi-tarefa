import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { FildsModule } from '../filds.module';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ale-input-ale',
  imports: [FildsModule, NgIf],
  templateUrl: './input-ale.component.html',
  styleUrl: './input-ale.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAleComponent),
      multi: true,
    },
  ],
})
export class InputAleComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() errorMessage: string = 'Este campo é obrigatório';
  @Input() numerico: boolean = false;
  @Input() value: any;
  @Input() isFocused: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // se quiser lidar com campo desabilitado
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let inputValue = input.value;

    if (this.numerico) {
      inputValue = inputValue.replace(/[^0-9,]/g, '');
      const parts = inputValue.split(',');
      if (parts.length > 2) {
        inputValue = parts[0] + ',' + parts.slice(1).join('');
      }
    }

    this.value = inputValue;
    this.valueChange.emit(inputValue);
    this.onChange(inputValue);
    this.onTouched();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.numerico) {
      const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
      const isNumber = /^[0-9]$/.test(event.key);
      const isComma = event.key === ',';
      const isAllowedKey = allowedKeys.includes(event.key);
      const alreadyHasComma = (this.value || '').toString().includes(',');

      if (!isNumber && !isAllowedKey && (!isComma || alreadyHasComma)) {
        event.preventDefault();
      }
    }
  }

  hasError(): boolean {
    return this.required && !this.value;
  }
}
