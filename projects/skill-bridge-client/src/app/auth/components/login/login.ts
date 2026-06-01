import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  passwordValidator,
  userIdentifierValidator
} from '../../../../../../shared/src/lib/auth/validators/auth.validators';
import { FormErrorService } from '../../../../../../shared/src/lib/services/form-error-service';
import { PrimaryLoader } from '../../../../../../shared/src/lib/ui/loaders/primary-loader/primary-loader';
import { UserTypes } from '../../../../../../shared/src/lib/auth/enums/user-type.enum';
import * as AuthSelectors from '../../../../../../shared/src/lib/auth/store/auth.selectors';
import * as AuthActions from '../../../../../../shared/src/lib/auth/store/auth.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    PrimaryLoader,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  private fb = inject(FormBuilder);
  private store = inject(Store);
  public formError = inject(FormErrorService);

  loading$ = this.store.select(
    AuthSelectors.selectAuthLoading
  );
  hidePassword = true;
  loginForm: FormGroup = this.fb.group({
    userIdentifier: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        userIdentifierValidator()
      ]
    ],
    userType: [
      UserTypes.CLIENT,
      [Validators.required]
    ],
    password: [
      '',
      [
        Validators.required,
        passwordValidator()
      ]
    ]
  });


  login(): void {
    if (this.formError.isFormInvalid(this.loginForm)) {
      this.formError.markDirty(this.loginForm);
      this.formError.markAllTouched(this.loginForm);
      return;
    }
    const formValue = this.loginForm.getRawValue();
    this.store.dispatch(
      AuthActions.login({
        userIdentifier: formValue.userIdentifier,
        password: formValue.password,
        userType: formValue.userType
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
    return this.formError.isFormInvalid(this.loginForm);
  }

  isControlInvalid(control: AbstractControl | null): boolean {
    return this.formError.isControlInvalid(control);
  }






  /*
  |--------------------------------------------------------------------------
  | FORM GETTERS
  |--------------------------------------------------------------------------
  */

  get userIdentifierControl(): AbstractControl | null {
    return this.loginForm.get('userIdentifier');
  }

  get passwordControl(): AbstractControl | null {
    return this.loginForm.get('password');
  }

}