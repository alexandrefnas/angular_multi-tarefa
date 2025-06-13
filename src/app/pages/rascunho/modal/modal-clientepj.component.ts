import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ale-modal-clientepj',
  imports: [NgIf],
  templateUrl: './modal-clientepj.component.html',
  styleUrl: './modal-clientepj.component.css',
})
export class ModalClientepjComponent {
  @Input() visible: boolean = false;
  @Input() closeOnBackdrop: boolean = true;
  @Input() title: string = 'Título';

  @Output() onClose = new EventEmitter<boolean>();

  onBackdropClick() {
    if (this.closeOnBackdrop) {
      this.cancel();
    }
  }

  cancelar(): void {
    this.cancel();
  }

  cancel() {
    this.onClose.emit(false);
  }
}
