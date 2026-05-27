import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { DetailsPersonalForm } from '../details-form/details-personal-form/details-personal-form';
import { DetailsPassportForm } from '../details-form/details-passport-form/details-passport-form';
import { DetailsSkillsForm } from '../details-form/details-skills-form/details-skills-form';
import { DetailsDocumentsForm } from '../details-form/details-documents-form/details-documents-form';
import { DetailsVisaMedicalForm } from '../details-form/details-visa-medical-form/details-visa-medical-form';
import { DetailsHiringHistory } from '../details-form/details-hiring-history/details-hiring-history';
import { DetailsEmergencyNotes } from '../details-form/details-emergency-notes/details-emergency-notes';


@Component({
  selector: 'details-tabs',
  imports: [

    CommonModule,
    MatTabsModule,

    DetailsPersonalForm,
    DetailsPassportForm,
    DetailsSkillsForm,
    DetailsDocumentsForm,
    DetailsVisaMedicalForm,
    DetailsHiringHistory,
    DetailsEmergencyNotes
  ],
  templateUrl: './details-tabs.html',
  styleUrl: './details-tabs.scss',
})
export class DetailsTabs {

  @Input({ required: true }) form!: FormGroup;
  
  @Input() editMode: boolean = false;

  get personalDetailsFG(): FormGroup { return this.form.get('personalDetails') as FormGroup; }

  get passportFG(): FormGroup { return this.form.get('passport') as FormGroup; }

  get skillsFA(): FormArray { return this.form.get('skills') as FormArray;}

  get documentsFA(): FormArray { return this.form.get('documents') as FormArray; }

  get hiringHistoryFA(): FormArray { return this.form.get('hiringHistory') as FormArray; }

  get visaMedicalFG(): FormGroup { return this.form.get('visaMedical') as FormGroup; }


  get emergencyNotesFG(): FormGroup { return this.form.get('emergencyNotes') as FormGroup; }

}
