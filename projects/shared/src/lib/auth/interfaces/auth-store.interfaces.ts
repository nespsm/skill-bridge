
export interface AuthState {

  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  sessionData: any | null;

  // emailOtpSent: boolean;

  // requiresTwoFactor: boolean;
  // twoFactorData: {
  //   userIdentifier: string;
  // } | null;
}