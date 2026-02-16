import { Component, inject, Inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormErrorService } from '../../../services/form-error-service';
import { OtpInputDirective } from '../../../directives/otp-input.directive';

@Component({
  selector: 'app-two-factor-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    OtpInputDirective
  ],
  templateUrl: './two-factor-auth.html',
  styleUrl: './two-factor-auth.scss',
})
export class TwoFactorAuth implements OnDestroy {

  private fb = inject(FormBuilder);
  private formError = inject(FormErrorService);

  twoFAForm = this.fb.group({
    otp: this.fb.array(Array.from({ length: 6 }, () => this.fb.control('', [Validators.required])))
  });

  isResending = false;
  resendCooldown = 0;
  private timerSub?: Subscription;


  data: { userIdentifier: string; } = inject(MAT_DIALOG_DATA);
  
  constructor(
    private dialogRef: MatDialogRef<TwoFactorAuth>
  ) { }

  verify() {

    this.otpArray.markAllAsTouched();

    if (this.twoFAForm.invalid) return;
    this.dialogRef.close(this.getOtpValue());
    this.otpArray.reset();
  }

  close() {
    this.dialogRef.close(null);
    this.otpArray.reset();
  }

  /** 🔁 RESEND OTP */
  resendOtp() {
    if (this.isResending || this.resendCooldown > 0) return;

    this.isResending = true;

    this.otpArray.reset();
    // 🔗 Call your API here
    // this.authService.resendOtp(this.data.userIdentifier).subscribe({
    //   next: () => this.startCooldown(),
    //   error: () => this.isResending = false
    // });

    // 🔥 TEMP (simulate success)
    setTimeout(() => {
      this.startCooldown();
      this.twoFAForm.reset();
    }, 500);
  }

  /** ⏱ Cooldown logic */
  private startCooldown(seconds = 30) {
    this.isResending = false;
    this.resendCooldown = seconds;

    this.timerSub?.unsubscribe();
    this.timerSub = interval(1000).subscribe(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) {
        this.timerSub?.unsubscribe();
      }
    });
  }



  get otpArray() {
    return this.twoFAForm.get('otp') as any;
  }

  get otpControls() {
    return this.otpArray.controls;
  }

  isOtpInvalid(): boolean {
    return this.otpArray.invalid && this.otpArray.touched;
  }

  private getOtpValue(): string {
    return this.otpControls.map((c: any) => c.value).join('');
  }


  getError(control: any, fieldName: string): string | null {
    return this.formError.getErrorMessage(control!, fieldName);
  }

  isFormInvalid(): boolean {
    return this.formError.isFormInvalid(this.twoFAForm);
  }


  isControlInvalid(control: AbstractControl | null): boolean {
    return this.formError.isControlInvalid(control);
  }

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }

}
