import { Routes } from '@angular/router';

export const enquiryRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import("./components/enquiry-management/enquiry-management")
            .then(c => c.EnquiryManagement),
        children: [

            { path: '', pathMatch: 'full', redirectTo: 'list' },
            {
                path: 'list',
                loadComponent: () => import("./components/enquiry-list/enquiry-list")
                    .then(c => c.EnquiryList),
            },
            {
                path: 'create',
                loadComponent: () => import("./components/create-enquiry/create-enquiry")
                    .then(c => c.CreateEnquiry),
            },
            {
                path: 'details/:id',
                loadComponent: () => import("./components/enquiry-details/enquiry-details")
                    .then(c => c.EnquiryDetails),
            }
            
        ]
    }
];