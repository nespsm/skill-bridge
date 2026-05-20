import {
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import { finalize } from 'rxjs';

import { Router } from '@angular/router';

import { LoaderService } from '../../services/loader-service';

export const loaderInterceptor: HttpInterceptorFn = (
  req,
  next
) => {

  const loaderService = inject(LoaderService);

  const router = inject(Router);

  // skip loader for silent requests
  if (req.headers.get('x-skip-loader')) {
    return next(req);
  }

  const requestId = crypto.randomUUID();

  const currentRoute = router.url;

  loaderService.show(requestId);

  return next(req).pipe(

    finalize(() => {

      // prevent stale route requests
      if (router.url !== currentRoute) {
        loaderService.clear();
        return;
      }

      loaderService.hide(requestId);
    })
  );
};