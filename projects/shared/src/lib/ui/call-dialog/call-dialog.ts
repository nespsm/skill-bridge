import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-call-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule ],
  templateUrl: './call-dialog.html',
  styleUrl: './call-dialog.scss',
})
export class CallDialog {

  data = inject(MAT_DIALOG_DATA);


  constructor(
    private dialogRef: MatDialogRef<CallDialog>
  ) { }

  closeModal() { this.close(); }


  private close() { this.dialogRef.close(); }
}
