import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const sessionData = tokenService.getSession();

    if (sessionData && sessionData.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionData.token}`
        }
      });
    }

    return next(req);
};
