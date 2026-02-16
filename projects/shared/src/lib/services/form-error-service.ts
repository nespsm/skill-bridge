import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  private errorMessages: Record<string, (field: string, error?: any) => string> = {
    required: (field) => `${field} is required.`,
    minlength: (field, error) => `${field} must be at least ${error.requiredLength} characters long.`,
    maxlength: (field, error) => `${field} cannot exceed ${error.requiredLength} characters.`,
    min: (field, error) => `${field} must be at least ${error.min}.`,
    max: (field, error) => `${field} cannot be greater than ${error.max}.`,
    email: (field) => `Please enter a valid email address for ${field}.`,
    invalidPassword: (field, error) => `${field} must contain at least one letter, one number, and be at least 6 characters long. Allowed symbols: @$!%*?&.`,
    passwordMismatch: (field, error) => `Password and confirm password do not match.`,
    invalidMimeType: (field) => `Invalid ${field} file type.`,
    invalidMobile: (field) => `Please enter a valid 10-digit mobile number for ${field}.`,
    invalidMobileLength: (field) => `Mobile number must be exactly 10 digits.`,
    invalidEmail: (field) => `Please enter a valid email.`,
    invalidUsername: (field) => `"@, . and spaces" not allowed in username.`,
    usernameTaken: (field) => `Username is already taken. Please choose another.`,
    mobileTaken: (field) => `Mobile number is already registered. Please use a different number.`,
    emailTaken: (field) => `Email is already registered. Please use a different email.`,
    invalidPCode: (field, error) => `${field} must be exactly ${error.requiredLength} digits.`,

    notTitleCase: (field, error) => `${field} use proper Title Case, e.g. "Mukesh Singh"`,
    invalidIdentifier: (field) => `Please enter a valid Email or 10-digit Mobile Number.`,


  };

  getErrorMessage(control: AbstractControl | null, fieldName = 'This field'): string | null {
    if (control?.errors && control.touched) {
      for (const errorName in control.errors) {
        if (this.errorMessages[errorName]) {
          return this.errorMessages[errorName](fieldName, control.errors[errorName]);
        }
      }
    }
    return null;
  }

  isControlInvalid(control: AbstractControl | null): boolean {
    return control?.invalid && (control.dirty || control.touched) || false;
  }

  markAllTouched(form: FormGroup): void {
    form.markAllAsTouched();
  }

  markDirty(form: FormGroup): void {
    form.markAsDirty();
  }

  isFormInvalid(form: FormGroup): boolean {
    return form?.invalid && (form.dirty || form.touched) || false;
  }
}