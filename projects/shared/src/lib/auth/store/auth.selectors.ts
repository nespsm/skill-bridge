import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../interfaces/auth-store.interfaces';

export const selectAuthState =
  createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated =
  createSelector(selectAuthState, state => state.isAuthenticated);

export const selectAuthLoading =
  createSelector(selectAuthState, state => state.loading);

export const selectAuthError =
  createSelector(selectAuthState, state => state.error);

export const selectRequiresTwoFactor =
  createSelector(selectAuthState, s => s.requiresTwoFactor);

export const selectTwoFactorData =
  createSelector(selectAuthState, s => s.twoFactorData);

export const selectSessionData =
  createSelector(selectAuthState, s => s.sessionData);

export const selectEmailOtpSent =
  createSelector(selectAuthState, s => s.emailOtpSent);


