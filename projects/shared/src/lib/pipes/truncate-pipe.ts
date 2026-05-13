import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(
    value: string | null | undefined,
    limit: number = 12,
    ellipsis: string = '...'
  ): string {

    if (!value) {
      return '';
    }

    return value.length > limit
      ? value.substring(0, limit) + ellipsis
      : value;
  }
}