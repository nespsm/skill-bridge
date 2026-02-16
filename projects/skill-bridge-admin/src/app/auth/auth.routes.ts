import { Routes } from "@angular/router";

export const authRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/auth/auth').then(c => c.Auth),
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            {
                path: 'login',
                loadComponent: () =>
                    import('./components/login/login').then(c => c.Login),
            },
            {
                path: 'forgot-password',
                loadComponent: () =>
                    import('../../../../shared/src/lib/auth/components/manage-password/forgot-password/forgot-password').then(
                        c => c.ForgotPassword
                    ),
            },
            {
                path: 'reset-password',
                loadComponent: () =>
                    import('../../../../shared/src/lib/auth/components/manage-password/reset-password/reset-password').then(
                        c => c.ResetPassword
                    ),
            },
            {
                path: 'verification',
                loadComponent: () =>
                    import('../../../../shared/src/lib/auth/modal-pop-ups/two-factor-auth/two-factor-auth').then(
                        c => c.TwoFactorAuth
                    ),
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./components/registration/registration').then(
                        c => c.Registration
                    ),
            }
        ]
    }
];
