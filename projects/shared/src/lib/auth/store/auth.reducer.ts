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

  on(AuthActions.loginSuccess, (state, { sessionData }) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    sessionData,
    error: null
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),



  // REGISTER

  on(AuthActions.register, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.registerSuccess, (state, { sessionData }) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    sessionData,
    error: null
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),



  // REHYDRATE

  on(AuthActions.rehydrateAuthSuccess, (state, { sessionData }) => ({
    ...state,
    isAuthenticated: true,
    sessionData,
    loading: false
  })),

  on(AuthActions.rehydrateAuthFailure, () => initialAuthState),



  // LOGOUT

  on(AuthActions.logout, () => initialAuthState)
);
