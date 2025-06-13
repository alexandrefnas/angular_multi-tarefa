import {
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  Output,
} from '@angular/core';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
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
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<Date>();

  onChange = (value: any) => {};
  onTouched = () => {};

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Delete') {
      this.value = null;
    }
  }

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
    this.disabled = isDisabled;
  }

  onDateChange(event: any) {
    this.value = event.value;
    this.valueChange.emit(this.value ?? undefined);

    this.onChange(this.value);
    this.onTouched();
  }

  ngControl: NgControl | null = null;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    try {
      this.ngControl = this.injector.get(NgControl);
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
      }
    } catch (e) {
      // Ignora se não estiver dentro de um FormControl
    }
  }

  hasError(): boolean {
    return (
      !!this.ngControl?.control?.invalid && !!this.ngControl?.control?.touched
    );
  }
}
