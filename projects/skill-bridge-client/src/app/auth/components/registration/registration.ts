import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {
  emailValidator,
  mobileValidator,
  passwordValidator
} from '../../../../../../shared/src/lib/auth/validators/auth.validators';

import { FormErrorService } from '../../../../../../shared/src/lib/services/form-error-service';

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

    PrimaryLoader
  ],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class Registration {

  private fb = inject(FormBuilder);
  private store = inject(Store);
  private formError = inject(FormErrorService);

  loading$ = this.store.select(
    AuthSelectors.selectAuthLoading
  );
  hidePassword = true;
  registrationForm = this.fb.group({
    companyName: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],
    country: [
      'India',
      [Validators.required]
    ],
    registrationNo: [
      '',
      [Validators.required]
    ],
    address: [
      '',
      [Validators.required]
    ],
    adminName: [
      '',
      [Validators.required]
    ],
    adminEmail: [
      '',
      [
        Validators.required,
        emailValidator()
      ]
    ],
    adminPassword: [
      '',
      [
        Validators.required,
        passwordValidator()
      ]
    ],
    adminPhone: [
      '',
      [
        Validators.required,
        mobileValidator()
      ]
    ]
  });


  register(): void {
    if (this.formError.isFormInvalid(this.registrationForm)) {
      this.formError.markDirty(this.registrationForm);
      this.formError.markAllTouched(this.registrationForm);
      return;
    }

    const formValue = this.registrationForm.getRawValue();

    this.store.dispatch(
      AuthActions.register({

        companyName: formValue.companyName!,
        country: formValue.country!,
        registrationNo: formValue.registrationNo!,
        address: formValue.address!,
        adminName: formValue.adminName!,
        adminEmail: formValue.adminEmail!,
        adminPassword: formValue.adminPassword!,
        adminPhone: formValue.adminPhone!

      })
    );
  }


  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  getError(control: any, fieldName: string): string | null {
    return this.formError.getErrorMessage(control, fieldName);
  }

  isFormInvalid(): boolean {
    return this.formError.isFormInvalid(this.registrationForm);
  }

  isControlInvalid(control: AbstractControl | null): boolean {
    return this.formError.isControlInvalid(control);
  }

}