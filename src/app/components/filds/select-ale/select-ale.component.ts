import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  Injector,
  ElementRef,
  HostListener,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'ale-select-ale',
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './select-ale.component.html',
  styleUrls: ['./select-ale.component.css'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAleComponent),
      multi: true,
    },
  ],
})
export class SelectAleComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() niveis: { value: string; label: string }[] = [];
  @Input() allowTyping: boolean = false;
  @Input() required: boolean = false;
  @Input() errorMessage: string = 'Campo obrigatório';

  @Input() isFocused: boolean = false;
  @Input() selectedValue: string = '';
  @Input() showOptions: boolean = false;
  @Input() filteredOptions: { value: string; label: string }[] = [];
  @Input() disabled: boolean = false;

  private onChange = (_: any) => {};
  onTouched = () => {};

  // Quando digita no input
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedValue = input.value;
    this.onChange(this.selectedValue);

    // Filtro simples
    this.filteredOptions = this.niveis.filter((option) =>
      option.label.toLowerCase().includes(this.selectedValue.toLowerCase())
    );
  }

  // Quando seleciona da lista
  selectOption(option: { value: string; label: string }): void {
    this.selectedValue = option.value;
    this.onChange(this.selectedValue);
    this.showOptions = false;
  }

  onSelectChange(event: any): void {
    this.selectedValue = event;
    this.onChange(event);
  }
  // Métodos do ControlValueAccessor
  writeValue(value: any): void {
    this.selectedValue = value;
    this.filteredOptions = this.niveis;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngControl: NgControl | null = null;

  constructor(private injector: Injector, private elementRef: ElementRef) {}

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

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.showOptions = false;
    }
  }
  // get errorMessage(): string {
  //   // Mensagem de erro padrão ou personalizada
  //   return 'Campo obrigatório';
  // }

  @Input() showOptionsClose: boolean = false;
  toggleOptions(): void {
    if (this.showOptionsClose) this.showOptions = !this.showOptions;
    else this.showOptionsClose = true;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.showOptions = false;
      this.showOptionsClose = true;
    }

    if (event.key === 'Delete') {
      this.selectedValue = '';
      this.onChange(this.selectedValue);
      this.filteredOptions = this.niveis; // opcional: reseta as opções
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    // se quiser lidar com campo desabilitado
    this.disabled = isDisabled;
  }

  onBlur() {
    setTimeout(() => {
      if (!this.isFocused) {
        this.showOptions = false;
      }
    }, 150); // tempo suficiente para permitir o clique no item
  }
}

// import { CommonModule, NgFor, NgIf } from '@angular/common';
// import {
//   Component,
//   Input,
//   Output,
//   EventEmitter,
//   forwardRef,
// } from '@angular/core';
// import {
//   ControlValueAccessor,
//   FormControl,
//   FormsModule,
//   NG_VALUE_ACCESSOR,
// } from '@angular/forms';

// @Component({
//   selector: 'ale-select-ale',
//   imports: [NgFor, NgIf, CommonModule, FormsModule],
//   templateUrl: './select-ale.component.html',
//   styleUrls: ['./select-ale.component.css'],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => SelectAleComponent),
//       multi: true,
//     },
//   ],
// })
// export class SelectAleComponent implements ControlValueAccessor {
//   @Input() label!: string;
//   @Input() placeholder!: string;
//   @Input() niveis: { value: string; label: string }[] = [];
//   @Input() errorMessage!: string;
//   @Input() allowTyping: boolean = false;

//   isFocused = false;
//   showOptions = false;

//   filteredOptions: any[] = [];

//   selectedValue: string | null = null;

//   onChange = (value: any) => {};
//   onTouched = () => {};

//   writeValue(value: any): void {
//     this.selectedValue = value;
//   }

//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }

//   setDisabledState?(isDisabled: boolean): void {
//     // Se quiser implementar disabled.
//   }

//   onSelectChange(event: any): void {
//     this.selectedValue = event;
//     this.onChange(event);
//   }

//   onInputChange(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     this.selectedValue = input.value;
//     this.filterOptions();
//     this.onChange(this.selectedValue);
//   }

//   selectOption(option: any): void {
//     this.selectedValue = option.value;
//     this.showOptions = false;
//     this.onChange(this.selectedValue);
//   }

//   filterOptions(): void {
//     if (!this.selectedValue) {
//       this.filteredOptions = [...this.niveis];
//       return;
//     }

//     const val = this.selectedValue.toLowerCase();
//     this.filteredOptions = this.niveis.filter((opt) =>
//       opt.label.toLowerCase().includes(val)
//     );
//   }

//   hasError(): boolean {
//     return !!this.errorMessage;
//   }
// }
