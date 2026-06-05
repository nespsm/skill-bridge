import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'details-certificate',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './details-certificate.html',
  styleUrl: './details-certificate.scss',
})
export class DetailsCertificate {


  @Input({ required: true })
  workerCertificatesFA!: FormArray;

  get certificateControls() {
    return this.workerCertificatesFA.controls as FormGroup[];
  }
}
