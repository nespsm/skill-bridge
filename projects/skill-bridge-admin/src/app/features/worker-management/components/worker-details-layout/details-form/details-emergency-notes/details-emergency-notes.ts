import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'details-emergency-notes',
  imports: [],
  templateUrl: './details-emergency-notes.html',
  styleUrl: './details-emergency-notes.scss',
})
export class DetailsEmergencyNotes {

  @Input() form!: FormGroup;
}
