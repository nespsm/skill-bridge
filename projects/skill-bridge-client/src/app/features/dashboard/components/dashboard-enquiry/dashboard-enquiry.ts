import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dashboard-enquiry',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard-enquiry.html',
  styleUrl: './dashboard-enquiry.scss',
})
export class DashboardEnquiry {

  @Input() enquiries: any;
}
