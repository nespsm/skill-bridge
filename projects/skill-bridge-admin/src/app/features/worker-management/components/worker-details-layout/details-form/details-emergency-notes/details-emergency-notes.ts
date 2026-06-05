import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'details-emergency-notes',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './details-emergency-notes.html',
  styleUrl: './details-emergency-notes.scss',
})
export class DetailsEmergencyNotes {

  @Input() emergencyNotesFG!: FormGroup;
}
