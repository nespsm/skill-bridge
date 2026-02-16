import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumbers]'
})
export class OnlyNumbers {
  private allowedKeys = [ 'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete', 'Home', 'End' ];

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const isNumberKey = /^[0-9]$/.test(event.key);
    const isAllowed = this.allowedKeys.includes(event.key);

    const isCtrlCommand = 
      event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase());

    if (!isNumberKey && !isAllowed && !isCtrlCommand) {
      event.preventDefault();
    }
  }
}
