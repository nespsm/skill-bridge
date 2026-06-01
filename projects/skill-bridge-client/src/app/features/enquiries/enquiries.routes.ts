import { Routes } from '@angular/router';

export const enquiriesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import("./components/enquiries-management/enquiries-management")
            .then(c => c.EnquiriesManagement),
        children: [

            { path: '', pathMatch: 'full', redirectTo: 'list' },
            {
                path: 'list',
                loadComponent: () => import("./components/enquiries-list/enquiries-list")
                    .then(c => c.EnquiriesList),
            },
            {
                path: 'create',
                loadComponent: () => import("./components/create-enquiry/create-enquiry")
                    .then(c => c.CreateEnquiry),
            },
            {
                path: 'details/:id',
                loadComponent: () => import("./components/enquiries-details/enquiries-details")
                    .then(c => c.EnquiriesDetails),
            }
            
        ]
    }
];