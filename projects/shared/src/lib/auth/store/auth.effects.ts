import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TokenService } from "../services/token-service";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import * as AuthActions from './auth.actions';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth-service";
import { DialogService } from "../../services/dialog-service";

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private dialogService = inject(DialogService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ userIdentifier, password, userType }) =>
        this.authService.login(userIdentifier, password, userType).pipe(

          map(res => {
            if (!res.sessionData) {
              throw new Error(res.message);
            }
            this.tokenService.saveSession(
              res.sessionData
            );
            return AuthActions.loginSuccess({
              sessionData: res.sessionData
            });
          }),

          catchError(err =>
            of(AuthActions.loginFailure({
              error: err.error?.message || 'Login failed'
            }))
          )
        )
      )
    )
  );


  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(payload =>
        this.authService.register(
          payload.companyName,
          payload.registrationNo,
          payload.country,
          payload.address,
          payload.adminName,
          payload.adminEmail,
          payload.adminPassword,
          payload.adminPhone
        ).pipe(

          map(res => {
            if (!res.sessionData) {
              throw new Error(res.message);
            }

            this.tokenService.saveSession(
              res.sessionData
            );

            return AuthActions.registerSuccess({
              sessionData: res.sessionData
            });
          }),

          catchError(err =>
            of(AuthActions.registerFailure({
              error: err.error?.message || 'Registration failed'
            }))
          )
        )
      )
    )
  );


  authSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginSuccess,
          AuthActions.registerSuccess
        ),

        tap(({ sessionData }) => {
          this.authService.routeToDashboard(sessionData);
        })
      ),
    { dispatch: false }
  );


  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),

        tap(({ error }) => {
          console.error('Login Failed:', error);
          this.dialogService.error(error);

        })
      ),
    { dispatch: false }
  );


  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerFailure),

        tap(({ error }) => {
          
          console.error('Register Failed:', error);

          this.dialogService.error(error);

        })
      ),
    { dispatch: false }
  );


  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),

        tap(() => {

          // CLEAR STORAGE
          this.tokenService.clearTokens();

          // REDIRECT
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );





  /*
  |--------------------------------------------------------------------------
  | REHYDRATE AUTH (APP REFRESH FIX)
  |--------------------------------------------------------------------------
  */

  rehydrateAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.rehydrateAuth),

      map(() => {

        const session = this.tokenService.getSession();

        if (session?.token) {

          return AuthActions.rehydrateAuthSuccess({
            sessionData: session
          });
        }

        return AuthActions.rehydrateAuthFailure();
      })
    )
  );
}