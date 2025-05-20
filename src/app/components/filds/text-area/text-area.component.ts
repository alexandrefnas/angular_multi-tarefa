import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FildsModule } from '../filds.module';

@Component({
  selector: 'ale-text-area',
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css',
  imports: [FildsModule, CommonModule],
})
export class TextAreaComponent implements OnInit {
  @Input() label: string = 'Titulo Text-area';
  @Input() value: string = '';
  @Input() min: number = 5;
  @Input() max: number = 256;
  inputControl: FormControl;

  constructor() {
    this.inputControl = new FormControl(this.value);
  }

  ngOnInit(): void {
    this.inputControl.setValidators([
      Validators.minLength(this.min),
      Validators.maxLength(this.max)
    ]);

    this.inputControl.setValue(this.value);
    this.inputControl.updateValueAndValidity();
  }

  get isInvalid() {
    return (
      this.inputControl.invalid &&
      (this.inputControl.dirty || this.inputControl.touched)
    );
  }
}
