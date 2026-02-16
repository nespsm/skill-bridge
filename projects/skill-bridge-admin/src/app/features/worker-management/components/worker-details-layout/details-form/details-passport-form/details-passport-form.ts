import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'details-passport-form',
  imports: [],
  templateUrl: './details-passport-form.html',
  styleUrl: './details-passport-form.scss',
})
export class DetailsPassportForm {

  @Input() form!: FormGroup;
}
