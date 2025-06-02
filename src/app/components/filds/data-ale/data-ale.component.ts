import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FildsModule } from '../filds.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ale-data-ale',
  imports: [FildsModule, NgIf],
  templateUrl: './data-ale.component.html',
  styleUrl: './data-ale.component.css',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DataAleComponent),
      multi: true,
    },
  ],
})
export class DataAleComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() value: Date | null | undefined = undefined;

  // @Input() value: Date = new Date();
  @Input() errorMessage: string = 'Campo obrigatório';
  @Input() required: boolean = false;
  @Input() isFocused: boolean = false;

  @Output() valueChange = new EventEmitter<Date>();

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: Date): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // implementar se quiser lidar com desabilitado
  }

  onDateChange(event: any) {
    this.value = event.value;
    this.valueChange.emit(this.value ?? undefined);

    this.onChange(this.value);
    this.onTouched();
  }

  hasError(): boolean {
    return this.required && !this.value;
  }
}
