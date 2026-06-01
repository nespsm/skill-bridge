// import { createAction, props } from '@ngrx/store';

// export const login = createAction(
//   '[Auth] Login',
//   props<{ userIdentifier: string; password: string; userType: string }>()
// );

// export const loginRequires2FA = createAction(
//   '[Auth] Login Requires 2FA',
//   props<{ twoFactorData: any }>()
// );

// export const registerRequires2FA = createAction(
//   '[Auth] Register Requires 2FA',
//   props<{ twoFactorData: any }>()
// );

// export const verifyOtp = createAction(
//   '[Auth] Verify OTP',
//   props<{ otp: string; userIdentifier: string }>()
// );

// export const loginFailure = createAction(
//   '[Auth] Login Failure',
//   props<{ error: string }>()
// );


// export const verifyOtpSuccess = createAction(
//   '[Auth] Verify OTP Success',
//   props<{ sessionData: any }>()
// );

// export const verifyOtpFailure = createAction(
//   '[Auth] Verify OTP Failure',
//   props<{ error: string }>()
// );


// export const logout = createAction('[Auth] Logout');















// // SEND OTP
// export const sendEmailOtp = createAction(
//   '[Auth] Send OTP',
//   props<{ userIdentifier: string; userType: string }>()
// );


// export const resetEmailOtpState = createAction(
//   '[Auth] Reset Email OTP State'
// );


// export const sendEmailOtpSuccess = createAction('[Auth] Send OTP Success');

// export const sendEmailOtpFailure = createAction(
//   '[Auth] Send OTP Failure',
//   props<{ error: string }>()
// );

// // REGISTER
// export const register = createAction(
//   '[Auth] Register',
//   props<{
//     companyName: string;
//     country: string;
//     registrationNo: string;
//     address: string;
//     adminName: string;
//     adminEmail: string;
//     adminPassword: string;
//     adminPhone: string;
//   }>()
// );

// export const verifyOtpRegisterSuccess = createAction(
//   '[Auth] Verify OTP Register Success',
//   props<{ twoFactorData: any }>()
// );

// export const verifyOtpRegisterFailure = createAction(
//   '[Auth] Verify OTP Register Failure',
//   props<{ error: string }>()
// );




// // auth.actions.ts
// export const rehydrateAuth = createAction('[Auth] Rehydrate');

// export const rehydrateAuthSuccess = createAction(
//   '[Auth] Rehydrate Success',
//   props<{ sessionData: any }>()
// );

// export const rehydrateAuthFailure = createAction(
//   '[Auth] Rehydrate Failure'
// );



import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{
    userIdentifier: string;
    password: string;
    userType: string;
  }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ sessionData: any }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);





export const register = createAction(
  '[Auth] Register',
  props<{
    companyName: string;
    country: string;
    registrationNo: string;
    address: string;
    adminName: string;
    adminEmail: string;
    adminPassword: string;
    adminPhone: string;
  }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ sessionData: any }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);





export const logout = createAction('[Auth] Logout');





export const rehydrateAuth = createAction('[Auth] Rehydrate');

export const rehydrateAuthSuccess = createAction(
  '[Auth] Rehydrate Success',
  props<{ sessionData: any }>()
);

export const rehydrateAuthFailure = createAction(
  '[Auth] Rehydrate Failure'
);
