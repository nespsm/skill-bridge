import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobileMask'
})
export class MobileMaskPipe implements PipeTransform {

  transform(mobile: string): string {
    if (!mobile) return '';

    // Remove non-digits and preserve country code if present
    const cleaned = mobile.replace(/\D/g, '');

    let countryCode = '';
    let numberPart = cleaned;

    // Handle country code (assumes India +91 as example)
    if (cleaned.length > 10) {
      countryCode = '+' + cleaned.slice(0, cleaned.length - 10) + '-';
      numberPart = cleaned.slice(-10);
    }

    const visibleStart = numberPart.slice(0, 2);
    const visibleEnd = numberPart.slice(-3);
    const maskedMiddle = '*'.repeat(numberPart.length - 5);

    return `${countryCode}${visibleStart}${maskedMiddle}${visibleEnd}`;
  }

}
