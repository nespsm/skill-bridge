import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

import { passwordValidator, userIdentifierValidator } from '../../../../../../shared/src/lib/auth/validators/auth.validators';
import { PrimaryLoader } from '../../../../../../shared/src/lib/ui/loaders/primary-loader/primary-loader';
import { FormErrorService } from '../../../../../../shared/src/lib/services/form-error-service';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Overlay } from '@angular/cdk/overlay';




import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TwoFactorAuth } from '../../../../../../shared/src/lib/auth/modal-pop-ups/two-factor-auth/two-factor-auth';
import { UserTypes } from '../../../../../../shared/src/lib/auth/enums/user-type.enum';



import * as AuthSelectors from '../../../../../../shared/src/lib/auth/store/auth.selectors';
import * as AuthActions from '../../../../../../shared/src/lib/auth/store/auth.actions';


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
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private overlay = inject(Overlay);



  hidePassword = true;
  loginForm!: FormGroup;

  loading$ = this.store.select(AuthSelectors.selectAuthLoading);
  twoFactorData$ = this.store.select(AuthSelectors.selectTwoFactorData);



  ngOnInit(): void {
    // Initialize login form
    this.initializeForm();
    this.listenToStoreSelectors();
  }

  listenToStoreSelectors() {
    this.twoFactorData$.subscribe(data => {
      if (data) this.open2FADialog(data);
    });
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      userIdentifier: ['', [Validators.required, Validators.minLength(5), userIdentifierValidator()]],
      userType: [UserTypes.CLIENT, [Validators.required]],
      password: ['', [
        Validators.required,
        passwordValidator()
      ]]
    });
  }

  async login(): Promise<void> {
    if (this.formError.isFormInvalid(this.loginForm)) {
      this.formError.markDirty(this.loginForm);
      this.formError.markAllTouched(this.loginForm);
      console.error("Please fill form correctly before saving");
      return;
    }
    const { userIdentifier, password, userType } = this.loginForm.value;

    this.open2FADialog(userIdentifier);
    // this.store.dispatch(
    //   AuthActions.login({ userIdentifier, password, userType })
    // );
  }


  private open2FADialog(loginData: any) {
    const dialogRef = this.dialog.open(TwoFactorAuth, {
      width: '650px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      panelClass: 'app-dialog',
      data: { userIdentifier: loginData.userIdentifier }
    });

    dialogRef.afterClosed().subscribe((otp: string | null) => {
      if (!otp) return;
      this.router.navigate(['/dashboard']);

      // this.store.dispatch(
      //   AuthActions.verifyOtp({ otp, userIdentifier: loginData.userIdentifier })
      // );
    });
  }



  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  getError(control: any, fieldName: string): string | null {
    return this.formError.getErrorMessage(control!, fieldName);
  }

  isFormInvalid(): boolean {
    return this.formError.isFormInvalid(this.loginForm);
  }


  isControlInvalid(control: AbstractControl | null): boolean {
    return this.formError.isControlInvalid(control);
  }


  get userIdentifierControl(): AbstractControl | null {
    return this.loginForm.get('userIdentifier');
  }

  get passwordControl(): AbstractControl | null {
    return this.loginForm.get('password');
  }
}
