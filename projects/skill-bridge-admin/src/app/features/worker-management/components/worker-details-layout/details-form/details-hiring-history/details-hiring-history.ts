import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'details-hiring-history',
  imports: [],
  templateUrl: './details-hiring-history.html',
  styleUrl: './details-hiring-history.scss',
})
export class DetailsHiringHistory {

  @Input({ required: true })
  hiringHistory!: FormArray;


}
