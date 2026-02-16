import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailMask'
})
export class EmailMaskPipe implements PipeTransform {

  transform(email: string): string {
    if (!email || !email.includes('@')) return '';

    const [name, domain] = email.split('@');

    const visiblePart = name.slice(0, 2);
    const maskedPart = '*'.repeat(Math.max(name.length - 2, 4));
    return `${visiblePart}${maskedPart}@${domain}`;
  }
}
