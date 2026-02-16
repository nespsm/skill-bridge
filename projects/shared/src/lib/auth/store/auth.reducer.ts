import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginRequires2FA, (state, { twoFactorData }) => ({
    ...state,
    loading: false,
    requiresTwoFactor: true,
    twoFactorData
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(AuthActions.verifyOtp, state => ({
    ...state,
    loading: true
  })),

  on(AuthActions.verifyOtpSuccess, (state, { sessionData }) => ({
    ...state,
    sessionData,
    loading: false,
    isAuthenticated: true,
    requiresTwoFactor: false,
    twoFactorData: null
  })),

  on(AuthActions.verifyOtpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AuthActions.logout, () => initialAuthState),







  on(AuthActions.sendEmailOtp, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.sendEmailOtpSuccess, state => ({
    ...state,
    loading: false,
    emailOtpSent: true
  })),

  on(AuthActions.sendEmailOtpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AuthActions.register, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.registerRequires2FA, (state, { twoFactorData }) => ({
    ...state,
    loading: false,
    twoFactorData
  })),

  on(AuthActions.verifyOtpRegisterFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(AuthActions.resetEmailOtpState, state => ({
    ...state,
    emailOtpSent: false
  })),


  // auth.reducer.ts
  on(AuthActions.rehydrateAuthSuccess, (state, { sessionData }) => ({
    ...state,
    isAuthenticated: true,
    sessionData,
    loading: false
  })),

  on(AuthActions.rehydrateAuthFailure, () => initialAuthState),


);
