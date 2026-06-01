import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IDashboardCard } from '../../models/dashboard.interfaces';
import { DashboardCard } from '../dashboard-card/dashboard-card';

@Component({
    selector: 'dashboard',
    imports: [RouterModule, DashboardCard],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
})
export class Dashboard {
    equiriesCount = signal(0);
    dashboardCards = computed<IDashboardCard[]>(() => [
        {
            title: 'Total Enquiries',
            value: this.equiriesCount(),
            route: '/enquiry/list',
            iconClass: 'icon-mask icon-xxl icon-inquiry color-dark-blue',
            cardClass: 'card-default',
            queryParams: { status: 'all' }
        },

        {
            title: 'Pending Enquiries',
            value: 50,
            route: '/enquiry/list',
            iconClass: 'icon-mask icon-xxl icon-pending color-orange',
            cardClass: 'card-default',
            queryParams: { status: 'pending' }
        },
        {
            title: 'New Alerts',
            value: 250,
            route: '/alerts',
                cardClass: 'card-alert',
            iconClass: 'icon-mask icon-xxl icon-alert color-red',
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
