import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyAlphabets]'
})
export class OnlyAlphabets {

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const initialValue = inputElement.value;

    // Replace non-alphabetic characters with an empty string
    inputElement.value = initialValue.replace(/[^a-zA-Z\s]/g, '');

    // If the value was modified, trigger an input event
    if (initialValue !== inputElement.value) {
      inputElement.dispatchEvent(new Event('input'));
    }
  }

}
