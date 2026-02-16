import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TokenService } from "../services/token-service";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import * as AuthActions from './auth.actions';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth-service";

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ userIdentifier, password, userType }) =>
        this.authService.login(userIdentifier, password, userType).pipe(
          map(res => {
            if (res.twoFactorData) {
              return AuthActions.loginRequires2FA({
                twoFactorData: res.twoFactorData
              });
            }

            throw new Error('Invalid login response');
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


  verifyOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifyOtp),
      switchMap(({ otp, userIdentifier }) =>
        this.authService.verifyOtp(otp, userIdentifier).pipe(
          map(res => {
            this.tokenService.saveSession(
              res.data.sessionData
            );

            return AuthActions.verifyOtpSuccess({
              sessionData: res.data.sessionData
            });
          }),
          catchError(err =>
            of(AuthActions.verifyOtpFailure({
              error: err.error?.message || 'OTP verification failed'
            }))
          )
        )
      )
    )
  );

  loginSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.verifyOtpSuccess),
        tap((otpSuccess) => this.authService.routeToDashboard(otpSuccess.sessionData))
      ),
    { dispatch: false }
  );

  loginFailureRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.verifyOtpFailure),
        tap(({ error }) => {
          console.error('OTP Verification failed. Redirecting to login: ', error);
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );



  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.tokenService.clearTokens();
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );












  sendEmailOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendEmailOtp),
      switchMap(({ userIdentifier, userType }) => {
        // return of(AuthActions.sendEmailOtpSuccess());
        return this.authService.sendEmailOtp(userIdentifier, userType).pipe(
          map(() => AuthActions.sendEmailOtpSuccess()),
          catchError(err =>
            of(AuthActions.sendEmailOtpFailure({
              error: err.message || 'Email OTP failed'
            }))
          )
        ); 
      }
      )
    )
  );


  sendEmailOtpFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendEmailOtpFailure),
      tap(({ error }) => {
        console.error(error);
      })
    ),
    { dispatch: false }
  );


  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(payload =>
        this.authService.register(
          payload.fullName,
          payload.userIdentifier,
          payload.password!,
          payload.userType,
          payload.emailOtp
        ).pipe(
          map(res => {
            if (!res.status) throw new Error(res.message);
            return AuthActions.registerRequires2FA(res.twoFactorData);
          }),
          catchError(err =>
            of(AuthActions.verifyOtpRegisterFailure({
              error: err.message || 'Register failed'
            }))
          )
        )
      )
    )
  );



  verifyOtpRegisterFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifyOtpRegisterFailure),
      tap(({ error }) => {
        console.error(error);
        this.router.navigate(['/auth/register']);
      })
    ),
    { dispatch: false }
  );





  // auth.effects.ts
  rehydrateAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.rehydrateAuth),
      map(() => {
        const session = this.tokenService.getSession();

        if (session && session.token) {
          return AuthActions.rehydrateAuthSuccess({ sessionData: session });
        }

        return AuthActions.rehydrateAuthFailure();
      })
    )
  );

}