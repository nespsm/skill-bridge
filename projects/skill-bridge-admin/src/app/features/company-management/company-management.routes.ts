import { Routes } from '@angular/router';
import { clientQueryGuard } from './guards/client-query-guard';

export const companyRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import("./components/company-management/company-management")
            .then(c => c.CompanyManagement),
        children: [

            { path: '', pathMatch: 'full', redirectTo: 'list' },
            {
                path: 'list',
                loadComponent: () => import("./components/company-list-layout/company-list/company-list")
                    .then(c => c.CompanyList),
            },
            {
                path: 'details',
                canActivate: [clientQueryGuard],
                loadComponent: () => import("./components/company-details/company-details")
                    .then(c => c.CompanyDetails),
            }
        ]
    }
];