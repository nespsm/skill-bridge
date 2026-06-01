import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dashboard-alerts',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard-alerts.html',
  styleUrl: './dashboard-alerts.scss',
})
export class DashboardAlerts {

  @Input() alerts: any;
}
