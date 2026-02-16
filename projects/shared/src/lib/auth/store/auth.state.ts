import { AuthState } from "../interfaces/auth-store.interfaces";

export const initialAuthState: AuthState = {

  loading: false,
  error: null,
  emailOtpSent: false,

  isAuthenticated: false,

  requiresTwoFactor: false,
  twoFactorData: null,
  sessionData: null
};
