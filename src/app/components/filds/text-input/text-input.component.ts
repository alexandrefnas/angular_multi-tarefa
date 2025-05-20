import { Component, Input, OnInit } from '@angular/core';
import { FildsModule } from '../filds.module';
import { FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ale-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
  imports: [FildsModule, CommonModule],
})

export class TextInputComponent implements OnInit {

  @Input() label: string = "Titulo";
  @Input() value: string = '';
  @Input() min: number = 2;
  @Input() max: number = 10;
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
