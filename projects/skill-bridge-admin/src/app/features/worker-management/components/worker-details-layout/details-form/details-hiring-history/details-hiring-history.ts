import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'details-hiring-history',
  imports: [],
  templateUrl: './details-hiring-history.html',
  styleUrl: './details-hiring-history.scss',
})
export class DetailsHiringHistory {


  @Input() form!: FormGroup;
}
