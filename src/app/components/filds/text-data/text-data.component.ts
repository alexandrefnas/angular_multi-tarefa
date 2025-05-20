import { Component, Input } from '@angular/core';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { FildsModule } from '../filds.module';


@Component({
  selector: 'ale-text-data',
  templateUrl: './text-data.component.html',
  styleUrl: './text-data.component.css',
  imports: [FildsModule],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
   ],
})
export class TextDataComponent {
  @Input() label: string = "Titulo data";
  value!: Date;
}
