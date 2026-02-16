import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogData } from '../models/dialog-models';
import { CommonDialog } from '../ui/common-dialog/common-dialog';

@Injectable({ providedIn: 'root' })
export class DialogService {

  private dialog = inject(MatDialog);

  open(data: CommonDialogData) {
    return this.dialog.open(CommonDialog, {
      width: '420px',
      panelClass: 'app-dialog-panel',
      disableClose: true,
      data
    });
  }

  success(message: string, title = 'Success') {
    return this.open({ type: 'success', title, message });
  }

  error(message: string, title = 'Error') {
    return this.open({ type: 'error', title, message });
  }

  warning(message: string, title = 'Warning') {
    return this.open({ type: 'warning', title, message });
  }

  confirm(message: string, title = 'Confirm Action') {
    return this.open({
      type: 'confirm',
      title,
      message,
      showCancel: true,
      confirmText: 'Confirm',
      cancelText: 'Cancel'
    });
  }
}
