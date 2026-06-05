import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'details-hiring-history',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './details-hiring-history.html',
  styleUrl: './details-hiring-history.scss',
})
export class DetailsHiringHistory {

  @Input({ required: true })
  hiringHistory!: FormArray;

  get historyControls(): FormGroup[] {
    return this.hiringHistory.controls as FormGroup[];
  }

}
