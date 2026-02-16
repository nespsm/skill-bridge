import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';
import { FormArray } from '@angular/forms';

@Directive({
  selector: '[appOtpInput]',
  standalone: true
})
export class OtpInputDirective {

  @Input() otpIndex!: number;
  @Input() otpArray!: FormArray;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  /* =============================
     INPUT → AUTO NEXT
  ============================= */
  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;

    input.value = input.value.replace(/\D/g, '');

    if (input.value && this.otpIndex < this.otpArray.length - 1) {
      this.focus(this.otpIndex + 1);
    }
  }

  /* =============================
     BACKSPACE → PREVIOUS
  ============================= */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = this.el.nativeElement;

    if (event.key === 'Backspace' && !input.value && this.otpIndex > 0) {
      this.focus(this.otpIndex - 1);
    }
  }

  /* =============================
     PASTE FULL OTP
  ============================= */
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pasted = event.clipboardData
      ?.getData('text')
      ?.replace(/\D/g, '')
      ?.slice(0, this.otpArray.length);

    if (!pasted) return;

    pasted.split('').forEach((char, index) => {
      this.otpArray.at(index).setValue(char);
    });

    this.focus(pasted.length - 1);
  }

  /* =============================
     FOCUS HELPER
  ============================= */
  private focus(index: number) {
    const parent = this.el.nativeElement.parentElement;
    const inputs = parent?.querySelectorAll('input');
    inputs?.[index]?.focus();
  }
}
