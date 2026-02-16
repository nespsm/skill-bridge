import { Routes } from "@angular/router";


export const requestsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import("./components/service-requests/service-requests")
            .then(c => c.ServiceRequests),
        children: [
            {
                path: 'approvals',
                loadComponent: () =>
                    import('./components/approvals/approvals').then(c => c.Approvals),
            },
            {
                path: 'job-requests',
                loadComponent: () =>
                    import('./components/job-requests/job-requests').then(c => c.JobRequests)
            },
            {
                path: 'alerts',
                loadComponent: () =>
                    import('./components/new-alerts/new-alerts').then(c => c.NewAlerts)
            }
        ]
    }
]