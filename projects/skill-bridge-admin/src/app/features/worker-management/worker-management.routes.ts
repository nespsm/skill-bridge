import { Routes } from '@angular/router';
import { workerQueryGuard } from './guards/worker-query-guard';

export const workerRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import("./components/worker-management/worker-management")
            .then(c => c.WorkerManagement),
        children: [

            { path: '', pathMatch: 'full', redirectTo: 'list' },
            {
                path: 'list',
                loadComponent: () => import("./components/worker-list-layout/worker-list/worker-list")
                    .then(c => c.WorkerList),
            },
            {
                path: 'details',
                canActivate: [workerQueryGuard],
                loadComponent: () => import("./components/worker-details-layout/worker-details/worker-details")
                    .then(c => c.WorkerDetails),
            }
        ]
    }
];