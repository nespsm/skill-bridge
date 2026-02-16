import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'details-visa-medical-form',
  imports: [],
  templateUrl: './details-visa-medical-form.html',
  styleUrl: './details-visa-medical-form.scss',
})
export class DetailsVisaMedicalForm {

  @Input() form!: FormGroup;
}
