import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardStat } from '../../models/dashboard.interfaces';
import { DashboardAlerts } from '../dashboard-alerts/dashboard-alerts';
import { DashboardEnquiry } from '../dashboard-enquiry/dashboard-enquiry';

@Component({
    selector: 'dashboard',
    imports: [RouterModule, DashboardAlerts, DashboardEnquiry],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
})
export class Dashboard {
    equiriesCount = signal(0);
    enquiries = computed<DashboardStat[]>(() => [

        {
            title: 'Total Enquiries',
            value: this.equiriesCount(),
            route: '/enquires/list',
            iconClass: 'icon-mask icon-lg icon-users color-blue-deep',
            cardClass: 'card-bg-blue-light',
            queryParams: { status: 'all' }
        },

        {
            title: 'Pending Enquiries',
            value: 50,
            route: '/workers/list',
            iconClass: 'icon-mask icon-lg icon-pending color-orange',
            cardClass: 'card-bg-orange-light',
            queryParams: { status: 'pending' }
        }
    ]);

    alerts = computed<DashboardStat[]>(() => [
        {
            title: 'New Alerts',
            value: 250,
            route: '/request/alerts',
            iconClass: 'icon-mask icon-lg icon-alert color-red',
            cardClass: 'card-bg-red-light'
        }
    ]);

    ngOnInit() {
        // this.getTotalWorkersCount();
    }

    // getTotalEnquiresCount() {
    //     this.workerService.seacrhWorker({}).subscribe({
    //         next: (response) => {
    //             const result = response.result;
    //             this.workersCount.set(result.totalRecords);
    //         },
    //         error: (error: Error) => {
    //             console.error(error);
    //         }
    //     });
    // }
}
