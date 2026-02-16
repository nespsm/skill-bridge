import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authReducer } from '../../../shared/src/lib/auth/store/auth.reducer';
import { AuthEffects } from '../../../shared/src/lib/auth/store/auth.effects';
import { tokenInterceptor } from '../../../shared/src/lib/auth/interceptors/token-interceptor';
import { AUTH_CONFIG } from '../../../shared/src/lib/auth/config/auth-config.token';
import { environment } from '../environments/environment';
import { UserTypes } from '../../../shared/src/lib/auth/enums/user-type.enum';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
     provideHttpClient(
      withInterceptors([tokenInterceptor])
    ),

    {
      provide: AUTH_CONFIG,
      useValue: {
        apiBaseUrl: environment.apiEndPoint,
        userType: UserTypes.CLIENT
      }
    },

    provideStore({
      auth: authReducer
    }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
