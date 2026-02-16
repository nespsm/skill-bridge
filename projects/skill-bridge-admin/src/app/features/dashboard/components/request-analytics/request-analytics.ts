import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'request-analytics',
  imports: [CommonModule, DecimalPipe, RouterModule],
  templateUrl: './request-analytics.html',
  styleUrl: './request-analytics.scss',
})
export class RequestAnalytics {

  @Input() stats: any;
}
