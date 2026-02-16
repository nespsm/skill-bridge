import { User } from "./user.interfaces";


export interface AuthState {

  loading: boolean;
  error: string | null;
  emailOtpSent: boolean;
  isAuthenticated: boolean;

  requiresTwoFactor: boolean;
  twoFactorData: {
    userIdentifier: string;
  } | null;
  sessionData: any | null;
}