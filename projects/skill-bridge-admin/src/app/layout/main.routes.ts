import { Routes } from "@angular/router";
import { dashboardRoutes } from "../features/dashboard/dashboard.routes";
import { companyRoutes } from "../features/company-management/company-management.routes";
import { workerRoutes } from "../features/worker-management/worker-management.routes";
import { masterRoutes } from "../features/master/master.routes";
import { requestsRoutes } from "../features/service-requests/request.routes";


export const mainRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import("./components/app-main/app-main")
            .then(c => c.AppMain),
        children: [

            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            {
                path: 'dashboard',
                loadChildren: () => dashboardRoutes
            },
            {
                path: 'clients',
                loadChildren: () => companyRoutes
            },
            {
                path: 'workers',
                loadChildren: () => workerRoutes
            },
            {
                path: 'request',
                loadChildren: () => requestsRoutes
            },
            {
                path: 'master',
                loadChildren: () => masterRoutes
            },
        ]
    }
]