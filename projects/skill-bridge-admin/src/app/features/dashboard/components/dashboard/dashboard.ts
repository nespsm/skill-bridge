import { Component, computed, inject, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestAnalytics } from '../request-analytics/request-analytics';
import { RequestDetails } from '../request-details/request-details';
import { QuickActions } from '../quick-actions/quick-actions';
import { DashboardStat } from '../../models/dashboard.interfaces';
import { WorkerManagementService } from '../../../worker-management/services/worker-management-service';

@Component({
    selector: 'dashboard',
    imports: [RouterModule, RequestAnalytics, RequestDetails, QuickActions],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
})
export class Dashboard {


    private workerService = inject(WorkerManagementService);

    workersCount = signal(0);

    stats = computed<DashboardStat[]>(() => [

        {
            title: 'Total Workers',
            value: this.workersCount(),
            route: '/workers/list',
            iconClass: 'icon-mask icon-lg icon-users color-blue-deep',
            cardClass: 'card-bg-blue-light',
            queryParams: { status: 'all' }
        },

        {
            title: 'Pending Approvals',
            value: 50,
            route: '/workers/list',
            iconClass: 'icon-mask icon-lg icon-pending color-orange',
            cardClass: 'card-bg-orange-light',
            queryParams: { status: 'pending' }
        },

        {
            title: 'Active Client Order',
            value: 150,
            route: '/clients/list',
            iconClass: 'icon-mask icon-lg icon-active color-green',
            cardClass: 'card-bg-green-light'
        },

        {
            title: 'New Alerts',
            value: 250,
            route: '/request/alerts',
            iconClass: 'icon-mask icon-lg icon-alert color-red',
            cardClass: 'card-bg-red-light'
        }
    ]);


    ngOnInit() {
        this.getTotalWorkersCount();
    }

    getTotalWorkersCount() {
        this.workerService.seacrhWorker({}).subscribe({
            next: (response) => {
                debugger;
                const result = response.result;
                this.workersCount.set(result.totalRecords);
            },
            error: (error: Error) => {
                console.error(error);
            }
        });
    }
}
