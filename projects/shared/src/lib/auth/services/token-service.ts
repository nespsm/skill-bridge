import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TokenService {
  saveSession(sessionData: any) {
    localStorage.setItem('user_ref_data', JSON.stringify(sessionData));
  }

  getSession() {
    const sessionData = localStorage.getItem('user_ref_data');
    return sessionData ? JSON.parse(sessionData) : null;
  }

  clearTokens() {
    localStorage.clear();
  }
}
