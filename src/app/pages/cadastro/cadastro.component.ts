import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextAreaComponent } from '../../components/filds/text-area/text-area.component';
import { TextDataComponent } from '../../components/filds/text-data/text-data.component';
import { TextInputComponent } from '../../components/filds/text-input/text-input.component';
import { TextSelectComponent } from '../../components/filds/text-select/text-select.component';

@Component({
  selector: 'ale-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  imports: [
  TextAreaComponent,
  TextDataComponent,
  TextInputComponent,
  TextSelectComponent,
  ReactiveFormsModule,
  FormsModule
  ]
})


export class CadastroComponent {
value: any;

}
