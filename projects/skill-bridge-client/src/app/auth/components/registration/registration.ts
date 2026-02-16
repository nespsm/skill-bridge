import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';


import { passwordValidator, userIdentifierValidator } from '../../../../../../shared/src/lib/auth/validators/auth.validators';
import { TwoFactorAuth } from '../../../../../../shared/src/lib/auth/modal-pop-ups/two-factor-auth/two-factor-auth';
import { FormErrorService } from '../../../../../../shared/src/lib/services/form-error-service';
import { OtpInputDirective } from '../../../../../../shared/src/lib/directives/otp-input.directive';
import { UserTypes } from '../../../../../../shared/src/lib/auth/enums/user-type.enum';

import * as AuthSelectors from '../../../../../../shared/src/lib/auth/store/auth.selectors';
import * as AuthActions from '../../../../../../shared/src/lib/auth/store/auth.actions';
import { PrimaryLoader } from '../../../../../../shared/src/lib/ui/loaders/primary-loader/primary-loader';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,

    OtpInputDirective,
    PrimaryLoader
  ],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class Registration {

  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private formError = inject(FormErrorService);

  private store = inject(Store);
  private overlay = inject(Overlay);

  loading$ = this.store.select(AuthSelectors.selectAuthLoading);
  emailOtpSent$ = this.store.select(AuthSelectors.selectEmailOtpSent);
  twoFactorData$ = this.store.select(AuthSelectors.selectTwoFactorData);

  hidePassword = true;

  registrationForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    userType: [UserTypes.CLIENT, [Validators.required]],
    userIdentifier: ['', [Validators.required, userIdentifierValidator()]],
    otp: this.fb.array(Array.from({ length: 6 }, () => this.fb.control('', [Validators.required]))),
    password: ['', [passwordValidator()]]
  });


  ngOnInit() {
    this.listenToStoreSelectors();
    this.listenFormControlChanges();
  }


  listenFormControlChanges() {
    this.registrationForm.get('userIdentifier')!
      .valueChanges
      .subscribe(() => {
        this.otpArray.reset();
        this.store.dispatch(AuthActions.resetEmailOtpState());
      });
  }

  listenToStoreSelectors() {
    this.twoFactorData$.subscribe(data => {
      if (data) this.open2FADialog(data);
    });
  }

  get otpControls() {
    return (this.registrationForm.get('otp') as FormArray).controls;
  }

  private getOtpValue(): string {
    return this.otpControls.map(c => c.value).join('');
  }


  sendOtp() {
    const { userIdentifier, userType } = this.registrationForm.value;
    if (!userIdentifier || !userType) return;

    this.store.dispatch(
      AuthActions.sendEmailOtp({ userIdentifier, userType })
    );


  }


  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }


  register() {
    this.otpArray.markAllAsTouched();
    if (this.registrationForm.invalid) return;

    this.store.dispatch(
      AuthActions.register({
        fullName: this.registrationForm.value.fullName!,
        emailOtp: this.getOtpValue(),
        userIdentifier: this.registrationForm.value.userIdentifier!,
        password: this.registrationForm.value.password!,
        userType: this.registrationForm.value.userType!
      })
    );
  }



  private open2FADialog(signupData: any) {
    const dialogRef = this.dialog.open(TwoFactorAuth, {
      width: '650px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      panelClass: 'app-dialog',
      data: { userIdentifier: signupData.userIdentifier }
    });

    dialogRef.afterClosed().subscribe((otp: string | null) => {
      if (!otp) return;

      this.store.dispatch(
        AuthActions.verifyOtp({ otp, userIdentifier: signupData.userIdentifier })
      );
    });
  }




  get otpArray(): FormArray {
    return this.registrationForm.get('otp') as FormArray;
  }

  isOtpInvalid(): boolean {
    return this.otpArray.invalid && this.otpArray.touched;
  }


  getError(control: any, fieldName: string): string | null {
    return this.formError.getErrorMessage(control!, fieldName);
  }

  isFormInvalid(): boolean {
    return this.formError.isFormInvalid(this.registrationForm);
  }


  isControlInvalid(control: AbstractControl | null): boolean {
    return this.formError.isControlInvalid(control);
  }
}
