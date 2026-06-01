import { Routes } from "@angular/router";
import { dashboardRoutes } from "../features/dashboard/dashboard.routes";
import { profileRoutes } from "../features/profile/profile.routes";
import { enquiryRoutes } from "../features/enquiry/enquiry.routes";


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
                path: 'enquiry',
                loadChildren: () => enquiryRoutes
            },
            {
                path: 'user',
                loadChildren: () => profileRoutes
            },
        ]
    }
]