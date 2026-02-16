import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthConfig } from '../interfaces/auth.interfaces';
import { AUTH_CONFIG } from '../config/auth-config.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private config = inject<AuthConfig>(AUTH_CONFIG);

  private loginApiUrl = this.config.apiBaseUrl + "auth/login";
  private signupApiUrl = this.config.apiBaseUrl + "auth/signup";
  private verifyApiUrl = this.config.apiBaseUrl + "auth/verify-otp";
  private sendOtpApiUrl = this.config.apiBaseUrl + "auth/send-otp";


  verifyOtp(otp: string, userIdentifier: string): Observable<any> {
    return this.http.post<any>(`${this.verifyApiUrl}`, {
      otp,
      userIdentifier
    });
  }


  sendEmailOtp(userIdentifier: string, userType: string): Observable<any> {
    return this.http.post<any>(`${this.sendOtpApiUrl}`, {
      userIdentifier,
      userType
    });
  }



  
  register(
    fullName: string,
    userIdentifier: string,
    password: string,
    userType: string,
    emailOtp: string,
  ): Observable<any> {
    return this.http.post<any>(`${this.signupApiUrl}`,
      {
        fullName,
        userIdentifier,
        password: password,
        userType: userType,
        emailOtp: emailOtp
      })
      .pipe(
        switchMap((response: any) => {
          return this.senD2FAData(response);
        })
      );
  }


  login(userIdentifier: string, password: string, userType: string): Observable<any> {
    return this.http.post<any>(`${this.loginApiUrl}`,
      {
        userIdentifier,
        password: password,
        userType: userType
      })
      .pipe(
        switchMap((response: any) => {
          return this.senD2FAData(response);
        })
      );
  }

  senD2FAData(response: any): Observable<any> {
    return of({
      status: response.status,
      message: response.message,
      twoFactorData: response.twoFactorData
    });
  }

  routeToDashboard(sessionData: any): void {
    if (sessionData) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

}
