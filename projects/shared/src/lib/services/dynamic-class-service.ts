import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicClassService {





    getBadgeClass(value: string): string {

    if (!value) return '';

    const normalized = value.toLowerCase().trim();

    // GREEN CONDITIONS
    const greenValues = [
      'yes',
      'interested',
      'active',
      'hired for abroad'
    ];

    // RED CONDITIONS
    const redValues = [
      'no',
      'not interested',
      'inactive',
      'not hired for abroad'
    ];

    // ORANGE CONDITIONS
    const orangeValues = [
      'pending'
    ];

    // BLUE CONDITIONS
    const blueValues = [
      'in-progress'
    ];

    const greyValues = [
      'done'
    ];

    if (greenValues.includes(normalized)) {
      return 'badge badge-green';
    }

    if (redValues.includes(normalized)) {
      return 'badge badge-red';
    }

    if (orangeValues.includes(normalized)) {
      return 'badge badge-orange';
    }

    if (blueValues.includes(normalized)) {
      return 'badge badge-blue';
    }

    if (greyValues.includes(normalized)) {
      return 'badge badge-grey';
    }

    return 'badge'; // default fallback
  }
}