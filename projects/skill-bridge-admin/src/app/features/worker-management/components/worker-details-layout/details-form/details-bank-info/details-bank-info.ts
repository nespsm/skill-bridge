import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'details-bank-info',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  templateUrl: './details-bank-info.html',
  styleUrl: './details-bank-info.scss',
})
export class DetailsBankInfo {

    @Input() workerBankDetailsFG!: FormGroup;

}
