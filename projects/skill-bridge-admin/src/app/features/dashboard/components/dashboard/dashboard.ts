import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestAnalytics } from '../request-analytics/request-analytics';
import { RequestDetails } from '../request-details/request-details';
import { QuickActions } from '../quick-actions/quick-actions';
import { DashboardStat } from '../../models/dashboard.interfaces';

@Component({
    selector: 'dashboard',
    imports: [RouterModule, RequestAnalytics, RequestDetails, QuickActions],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
})
export class Dashboard {

    stats: DashboardStat[] = [
        {
            title: 'Total Workers',
            value: 1250,
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
            cardClass: 'card-bg-green-light',
            queryParams: { status: 'active' } 
        },
        {
            title: 'New Alerts',
            value: 250,
            route: '/request/alerts',
            iconClass: 'icon-mask icon-lg icon-alert color-red',
            cardClass: 'card-bg-red-light'
        },
    ];
}
