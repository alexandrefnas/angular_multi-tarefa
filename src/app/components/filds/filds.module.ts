import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { InputAleComponent } from './input-ale/input-ale.component';
import { SelectAleComponent } from './select-ale/select-ale.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,

    SelectAleComponent,
  ],
  exports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,

    SelectAleComponent,
  ],
})
export class FildsModule {}

//   FormsModule,
//   MatFormFieldModule,
//   FormsModule,
//   MatInputModule,
// imports: [MatSelectModule, MatFormFieldModule, FormsModule, MatInputModule],
