import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { EMPTY } from 'rxjs';
import { TokenService } from '../services/token-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);
  const sessionData = tokenService.getSession();

  const publicUrls = [
    '/auth/login',
    '/auth/register'
  ];

  const isPublicApi = publicUrls.some(url =>
    req.url.includes(url)
  );

  if (!sessionData?.token && !isPublicApi) {
    router.navigate(['/auth/login']);
    return EMPTY;
  }

  // Attach token
  if (sessionData?.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionData.token}`
      }
    });
  }

  return next(req);
};