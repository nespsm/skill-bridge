import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-enquiry',
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard-enquiry.html',
  styleUrl: './dashboard-enquiry.scss',
})
export class DashboardEnquiry {

  @Input() enquiries: any;
}
