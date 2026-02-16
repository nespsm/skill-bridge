import { Routes } from "@angular/router";

export const masterRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/master-layout/master-layout').then(c => c.MasterLayout),
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'categories' },
            {
                path: 'categories',
                loadComponent: () =>
                    import('./components/category-management/category/category').then(c => c.Category),
            }
        ]
    }
];
