import { Directive, ElementRef, HostListener, inject, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[maxCharLimit]'
})
export class MaxCharLimit {
  @Input() maxCharLimit!: number;
  private el = inject(ElementRef);

  constructor(@Optional() private ngControl: NgControl) { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let value = inputElement.value;

    // Trim value if it exceeds the max length
    if (value.length > this.maxCharLimit) {
      value = value.substring(0, this.maxCharLimit);

      // Update the UI immediately
      inputElement.value = value;

      // Ensure FormControl gets updated
      if (this.ngControl?.control) {
        this.ngControl.control.setValue(value, { emitEvent: false });
      }
    }
  }
}
