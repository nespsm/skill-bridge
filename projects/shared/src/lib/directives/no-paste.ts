import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[noPaste]'
})
export class NoPaste {

  @HostListener('paste', ['$event'])
  disablePaste(event: ClipboardEvent) {
    event.preventDefault();
  }

}
