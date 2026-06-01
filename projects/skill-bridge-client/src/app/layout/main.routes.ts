import { Routes } from "@angular/router";
import { dashboardRoutes } from "../features/dashboard/dashboard.routes";
import { enquiriesRoutes } from "../features/enquiries/enquiries.routes";


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
                path: 'enquiries',
                loadChildren: () => enquiriesRoutes
            },
        ]
    }
]