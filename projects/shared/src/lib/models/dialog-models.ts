export type DialogType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

export interface CommonDialogData {
  type: DialogType;
  title: string;
  message: string;

  confirmText?: string;
  cancelText?: string;

  showCancel?: boolean;
}
