import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ale-select-ale',
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './select-ale.component.html',
  styleUrl: './select-ale.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAleComponent),
      multi: true,
    },
  ],
})
export class SelectAleComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Selecione...';
  @Input() niveis: { value: string; label: string }[] = [];
  @Input() isFocused = false;
  @Input() errorMessage = 'Campo obrigatório';

  @Input() selectedValue: string | null = null;
  @Output() selectedValueChange = new EventEmitter<string | null>();
  @Output() selected = new EventEmitter<string | null>();

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: string | null): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implementar se necessário
  }

  onSelectChange(value: string | null): void {
    this.selectedValue = value;
    this.selectedValueChange.emit(value);
    this.selected.emit(value);
    this.onChange(value);
    this.onTouched();
  }

  hasError(): boolean {
    return !this.selectedValue;
  }
}
