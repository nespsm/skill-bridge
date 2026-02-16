import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";

export const clientQueryGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {


  const router = inject(Router);

    const clientId = route.queryParamMap.get('clientId');

    if (!clientId) {
        return router.createUrlTree(['/clients/list']);
    }

  return true;
};

