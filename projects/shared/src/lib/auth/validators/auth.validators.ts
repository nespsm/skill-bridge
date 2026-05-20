import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup, Validators } from '@angular/forms';


export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailRegex.test(control.value);
        return isValid ? null : { invalidEmail: true };
    };
}

export function mobileValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const mobileRegex = /^[6-9]\d{9}$/;
        const isValid = mobileRegex.test(control.value);
        return isValid ? null : { invalidMobile: true };
    };
}

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&.]{6,}$/;
        const isValid = passRegex.test(control.value);
        return isValid ? null : { invalidPassword: true };
    };
}


export function postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const codeRegex = /^[0-9]{6}$/;
        const isValid = codeRegex.test(control.value);

        if (isValid) return null;

        return { invalidPCode: { requiredLength: 6 } };
    };
}


export function passwordMatchValidator(
    passwordField: string,
    confirmPasswordField: string
): ValidatorFn {

    return (formGroup: AbstractControl): ValidationErrors | null => {

        const passwordControl = formGroup.get(passwordField);
        const confirmPasswordControl = formGroup.get(confirmPasswordField);

        if (!passwordControl || !confirmPasswordControl) {
            return null;
        }

        const password = passwordControl.value;
        const confirmPassword = confirmPasswordControl.value;

        // don't overwrite other errors
        if (
            confirmPasswordControl.errors &&
            !confirmPasswordControl.errors['passwordMismatch']
        ) {
            return null;
        }

        // check mismatch
        if (
            password &&
            confirmPassword &&
            password !== confirmPassword
        ) {

            confirmPasswordControl.setErrors({
                ...confirmPasswordControl.errors,
                passwordMismatch: true
            });

        } else {

            // remove only passwordMismatch error
            if (confirmPasswordControl.hasError('passwordMismatch')) {

                const errors = {
                    ...confirmPasswordControl.errors
                };

                delete errors['passwordMismatch'];

                confirmPasswordControl.setErrors(
                    Object.keys(errors).length ? errors : null
                );
            }
        }

        return null;
    };
}

export function userIdentifierValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value?.trim();

        if (!value) return { required: true };

        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const mobileRegex =
            /^[6-9]\d{9}$/;

        // ✅ VALID EMAIL
        if (emailRegex.test(value)) {
            return null;
        }

        // ✅ VALID MOBILE
        if (mobileRegex.test(value)) {
            return null;
        }

        // ❌ ANYTHING ELSE
        return { invalidIdentifier: true };
    };
}




export function usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const usernameRegex = /^[^@.\s]+$/;
        const isValid = usernameRegex.test(control.value);
        return isValid ? null : { invalidUsername: true };
    };
}


export function requiredTrim(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (value === null || value === undefined) return { requiredTrim: true };
        if (typeof value === 'string' && value.trim().length === 0) {
            return { required: true };
        }

        return null;
    };
}

export function titleCaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value = '';
        if (!control.value) return null;
        if (typeof control.value === 'string') value = control.value;
        else if (typeof control.value === 'object' && control.value.name) value = control.value.name;

        const words = value.split(/\s+/);

        const isValid = words.every(word => {
            if (!word) return false;
            const firstChar = word.charAt(0);
            const rest = word.slice(1);
            return /^[A-Z]/.test(firstChar) && rest === rest.toLowerCase();
        });

        return isValid ? null : { notTitleCase: true };
    };
}




export function minLengthWrapper(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value = '';
        if (!control.value) return null;
        if (typeof control.value === 'string') value = control.value;
        else if (typeof control.value === 'object' && control.value.name) value = control.value.name;

        return Validators.minLength(min)({ value } as AbstractControl);
    };
}

export function maxLengthWrapper(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value = '';
        if (!control.value) return null;
        if (typeof control.value === 'string') value = control.value;
        else if (typeof control.value === 'object' && control.value.name) value = control.value.name;

        return Validators.maxLength(max)({ value } as AbstractControl);
    };
}