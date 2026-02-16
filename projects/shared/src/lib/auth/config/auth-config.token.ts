import { InjectionToken } from '@angular/core';
import { AuthConfig } from '../interfaces/auth.interfaces';

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG');
