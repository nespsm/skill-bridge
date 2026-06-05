import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from 'rxjs';

import { TokenService } from '../services/token-service';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import { DialogService } from '../../services/dialog-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const store = inject(Store);
  const dialogService = inject(DialogService);

  const sessionData = tokenService.getSession();

  const publicUrls = [
    '/auth/login',
    '/company/login',
    '/company/register'
  ];

  const isPublicApi = publicUrls.some(url =>
    req.url.includes(url)
  );

  if (!sessionData?.token && !isPublicApi) {
    router.navigate(['/auth/login']);
    return EMPTY;
  }

  if (sessionData?.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionData.token}`
      }
    });
  }

  // return next(req);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 500 && error.error.message === "Invalid or Expired Token") {

        if (router.url !== '/auth/login') {
          dialogService.error("Session Expired. Please Login again!");
          store.dispatch(AuthActions.logout());
          router.navigate(['/auth/login']);
        }
      }

      return throwError(() => error);
    })
  );
};