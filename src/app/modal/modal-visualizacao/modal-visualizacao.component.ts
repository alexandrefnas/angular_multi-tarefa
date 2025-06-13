import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ale-modal-visualizacao',
  imports: [MatDialogModule],
  templateUrl: './modal-visualizacao.component.html',
  styleUrl: './modal-visualizacao.component.css',
})
export class ModalVisualizacaoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private dialogRef: MatDialogRef<ModalVisualizacaoComponent>
  ) {}

  fechar() {
    this.dialogRef.close();
  }
}
