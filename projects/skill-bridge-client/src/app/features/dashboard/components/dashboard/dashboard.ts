import { Component } from '@angular/core';
import { SearchRequests } from '../manage-requests/search-requests/search-requests';
import { RequestSummary } from '../manage-requests/request-summary/request-summary';
import { WorkersSummary } from '../manage-workers/workers-summary/workers-summary';
import { DashboardNotification } from '../dashboard-notification/dashboard-notification';

@Component({
  selector: 'app-dashboard',
  imports: [SearchRequests, RequestSummary, WorkersSummary, DashboardNotification],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
