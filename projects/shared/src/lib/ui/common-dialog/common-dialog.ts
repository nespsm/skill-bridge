import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonDialogData } from '../../models/dialog-models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-common-dialog',
  imports: [CommonModule],
  templateUrl: './common-dialog.html',
  styleUrl: './common-dialog.scss',
})
export class CommonDialog {


  data : CommonDialogData = inject(MAT_DIALOG_DATA);

  constructor(
    private dialogRef: MatDialogRef<CommonDialog>
  ) { }

  close() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }

  getIcon(): string {
    switch (this.data.type) {
      case 'success': return 'icon-check-circle color-green';
      case 'error': return 'icon-close color-red';
      case 'warning': return 'icon-pending color-orange';
      case 'info': return 'icon-bell color-blue-deep';
      case 'confirm': return 'icon-alert color-orange';
      default: return '';
    }
  }

  getHeaderClass(): string {
    return `dialog-${this.data.type}`;
  }

}
