import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';

export const workerQueryGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

    const router = inject(Router);

    const workerId = route.queryParamMap.get('workerId');

    if (!workerId) {
        return router.createUrlTree(['/workers/list']);
    }

    return true;
};
