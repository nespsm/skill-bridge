import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'details-skills-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './details-skills-form.html',
  styleUrl: './details-skills-form.scss',
})
export class DetailsSkillsForm {

  @Input({ required: true })
  skills!: FormArray;

  private fb = inject(FormBuilder);

  get skillControls(): FormGroup[] {
    return this.skills.controls as FormGroup[];
  }



  addSkill(): void {

    this.skills.push(
      this.fb.group({
        id: [0],
        skillId: [null],
        skillName: [''],
        categoryId: [null],
        categoryName: ['']
      })
    );
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

}
