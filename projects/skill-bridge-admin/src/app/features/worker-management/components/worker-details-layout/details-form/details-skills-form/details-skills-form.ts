import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'details-skills-form',
  imports: [],
  templateUrl: './details-skills-form.html',
  styleUrl: './details-skills-form.scss',
})
export class DetailsSkillsForm {

  @Input() form!: FormGroup;
}
