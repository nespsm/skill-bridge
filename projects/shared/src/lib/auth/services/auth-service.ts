import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthConfig } from '../interfaces/auth.interfaces';
import { AUTH_CONFIG } from '../config/auth-config.token';
import { UserTypes } from '../enums/user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private config = inject<AuthConfig>(AUTH_CONFIG);

  private loginApiUrl = this.config.apiBaseUrl + "/admin/auth/login/v1.0";
  private signupApiUrl = this.config.apiBaseUrl + "/admin/auth/createUsers/v1.0";
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
    companyName: string,
    registrationNo: string,
    country: string,
    address: string,
    adminName: string,
    adminEmail: string,
    adminPassword: string,
    adminPhone: string
  ): Observable<any> {
    if (this.config.userType === UserTypes.CLIENT) {
      this.signupApiUrl = this.config.apiBaseUrl + '/auth/company/register';
    }
    return this.http.post<any>(`${this.signupApiUrl}`,
      {
        companyName,
        registrationNo,
        country,
        address,
        adminName,
        adminEmail,
        adminPassword,
        adminPhone
      })
      .pipe(
        switchMap((response: any) => {
          return this.sendSessionData(response);
        })
      );
  }


  login(userIdentifier: string, password: string, userType: string): Observable<any> {
    const payload =
      this.config.userType === UserTypes.CLIENT
        ? { email: userIdentifier, password }
        : { username: userIdentifier, password };

    this.loginApiUrl =
      this.config.userType === UserTypes.CLIENT
        ? `${this.config.apiBaseUrl}/auth/company/login`
        : `${this.config.apiBaseUrl}/admin/auth/login/v1.0`;

    return this.http.post<any>(`${this.loginApiUrl}`, payload)
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
