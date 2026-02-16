import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormErrorService } from '../../../../../../../../../shared/src/lib/services/form-error-service';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'details-personal-form',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './details-personal-form.html',
  styleUrl: './details-personal-form.scss',
})
export class DetailsPersonalForm {


  private formError = inject(FormErrorService);

  @Input() form!: FormGroup;


  getError(control: any, fieldName: string): string | null {
    return this.formError.getErrorMessage(control!, fieldName);
  }

  isFormInvalid(): boolean {
    return this.formError.isFormInvalid(this.form);
  }


  isControlInvalid(control: AbstractControl | null): boolean {
    return this.formError.isControlInvalid(control);
  }
}
