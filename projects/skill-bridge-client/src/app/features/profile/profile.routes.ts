import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import("./components/profile-management/profile-management")
            .then(c => c.ProfileManagement),
        children: [

            { path: '', pathMatch: 'full', redirectTo: 'details' },
            {
                path: 'details',
                loadComponent: () => import("./components/user-profile/user-profile")
                    .then(c => c.UserProfile),
            }
        ]
    }
];