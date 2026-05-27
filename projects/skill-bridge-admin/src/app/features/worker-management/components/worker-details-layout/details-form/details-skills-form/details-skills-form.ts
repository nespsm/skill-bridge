import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'details-skills-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './details-skills-form.html',
  styleUrl: './details-skills-form.scss',
})
export class DetailsSkillsForm {

  @Input({ required: true })
  skills!: FormArray;

  private fb = inject(FormBuilder);


  get categoryControls(): FormGroup[] {
    return this.skills.controls as FormGroup[];
  }

  getSkills(categoryIndex: number): FormArray {
    return this.categoryControls[categoryIndex].get('skills') as FormArray;
  }

  getSkillControls(categoryIndex: number): FormGroup[] {
    return this.getSkills(categoryIndex).controls as FormGroup[];
  }



  addSkill(categoryIndex: number): void {
    this.getSkills(categoryIndex).push(
      this.fb.group({
        skillId: [null],
        skillName: [''],
        isVerified: [false],
      })
    );
  }

  removeSkill(
    categoryIndex: number,
    skillIndex: number
  ): void {
    this.getSkills(categoryIndex).removeAt(skillIndex);
  }

}
