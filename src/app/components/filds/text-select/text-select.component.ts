import { Component, Input } from '@angular/core';
import { FildsModule } from '../filds.module';

@Component({
  selector: 'ale-text-select',
  templateUrl: './text-select.component.html',
  styleUrl: './text-select.component.css',
  imports: [FildsModule],
})
export class TextSelectComponent {
 @Input() label: string = "Titulo Select";
}
