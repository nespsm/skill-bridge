import { Routes } from '@angular/router';
import { authGuard } from '../../../shared/src/lib/auth/guards/auth-guard';
import { authRoutes } from './auth/auth.routes';
import { mainRoutes } from './layout/main.routes';

export const routes: Routes = [
    {
        path: '',
        // canActivate: [authGuard],
        loadChildren: () => mainRoutes
    },
    {
        path: 'auth',
        loadChildren: () => authRoutes
    },
    {
        path: '**',
        loadComponent: () =>
            import('../../../shared/src/lib/ui/page-not-found/page-not-found')
                .then(c => c.PageNotFound),
    }
];