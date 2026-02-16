import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'details-documents-form',
  imports: [],
  templateUrl: './details-documents-form.html',
  styleUrl: './details-documents-form.scss',
})
export class DetailsDocumentsForm {

  @Input() form!: FormGroup;

}
