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

  private loginApiUrl = this.config.apiBaseUrl + "user/admin/auth/login/v1.0";
  private signupApiUrl = this.config.apiBaseUrl + "user/admin/auth/createUsers/v1.0";
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
    name: string,
    userIdentifier: string,
    password: string,
    roleId: number,
    // emailOtp: string,
  ): Observable<any> {
    return this.http.post<any>(`${this.signupApiUrl}`,
      {
        name,
        email:userIdentifier,
        password: password,
        roleId
        // emailOtp: emailOtp
      })
      .pipe(
        switchMap((response: any) => {
          return this.sendSessionData(response);
        })
      );
  }


  login(userIdentifier: string, password: string, userType: string): Observable<any> {
    return this.http.post<any>(`${this.loginApiUrl}`,
      {
        username: userIdentifier,
        password: password,
        // userType: userType
      })
      .pipe(
        switchMap((response: any) => {
          return this.sendSessionData(response);
        })
      );
  }

  // send2FAData(response: any): Observable<any> {
  //   return of({
  //     status: response.status,
  //     message: response.message,
  //     twoFactorData: response.twoFactorData
  //   });
  // }

  sendSessionData(response: any): Observable<any> {
    return of({
      status: response.status,
      message: response.message,
      sessionData: response.result
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
