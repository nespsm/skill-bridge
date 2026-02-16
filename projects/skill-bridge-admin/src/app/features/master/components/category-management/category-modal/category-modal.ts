import { Component, inject, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MasterCategoryService } from '../../../services/master-category-service';
import { MasterSkillService } from '../../../services/master-skill-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormErrorService } from '../../../../../../../../shared/src/lib/services/form-error-service';
import { formatName } from '../../../../../../../../shared/src/lib/utils/common.utilities';
import { MasterModalMode } from '../../../models/modal-mode.type';
import { CategoryType } from '../../../models/category.model';

@Component({
  selector: 'category-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './category-modal.html',
  styleUrl: './category-modal.scss',
})
export class CategoryModal {

  private fb = inject(FormBuilder);
  private formError = inject(FormErrorService);
  private categoryService = inject(MasterCategoryService);
  private skillService = inject(MasterSkillService);
  input: any = inject(MAT_DIALOG_DATA);

  mode!: MasterModalMode; 
  modeName!: string;
  data!: CategoryType; 
  categories!: any;
  skills!: any;
  categoryForm = this.fb.group({
    categoryId: [0, [Validators.required]],
    categoryName: ['',[Validators.required]],
    description: [''],
    skills: this.fb.array([])
  });

  get skillsFA() { return this.categoryForm.get('skills') as FormArray; }

  constructor(
    private dialogRef: MatDialogRef<CategoryModal>
  ) { }

  ngOnInit() {
    this.initializeData();
    this.loadSkillsIntoForm();
    this.applyModeConfiguration();
  }

  private initializeData() {
    this.mode = this.input.mode;
    this.modeName = formatName(this.mode);
    this.data = this.input.data!;
    this.skills = this.input.skills || [];
    this.categories = this.input.categories || [];
  }

  private loadSkillsIntoForm() {
    this.skillsFA.clear();

    if (this.mode === 'add-category') return;

    this.skills.forEach((skill: any) =>
      this.skillsFA.push(this.createSkillForm(skill))
    );
  }


  private applyModeConfiguration() {
    if (this.mode === 'add-category') {
      this.skillsFA.push(this.createSkillForm());
    }

    const configMap: Record<MasterModalMode, () => void> = {
      'edit-category': () => this.patchCategory(),
      'view-category': () => { this.patchCategory(); this.categoryForm.disable(); },
      'add-category-skills': () => { this.patchCategory(); this.disableControls(['categoryName', 'description']); },
      'add-skills': () => { this.disableControls(['description']); },
      'add-category': () => { }
    };

    configMap[this.mode]?.();
  }


  private patchCategory() {
    this.categoryForm.patchValue(this.data);
  }

  private disableControls(fields: string[]) {
    fields.forEach(f => this.categoryForm.get(f)?.disable());
  }

  private createSkillForm(skill?: any) {
    return this.fb.group({
      id: [skill?.id || null, [Validators.required]],
      skillName: [skill?.skillName || '', [Validators.required]],
      description: [skill?.description || '']
    });
  }

  addSkill() {
    this.skillsFA.push(this.createSkillForm());
  }

  removeRow(index: number) { this.skillsFA.removeAt(index); }

  // ========================= // EVENTS // ========================= 
  onCategoryChange(categoryId: number) {
    const category = this.categories.find((c: any) => c.id === categoryId);
    this.categoryForm.patchValue({ description: category?.description });
  }


  submit() {
    const value = this.categoryForm.getRawValue();
    const actionMap: Record<
      MasterModalMode,
      () => void> = {
      'add-category': () => this.categoryService.addCategory(value).subscribe(() => this.close(true)),
      'edit-category': () => this.categoryService.updateCategory({ ...value }).subscribe(() => this.close(true)),
      'add-category-skills': () => this.saveSkills(this.data.id),
      'add-skills': () => { if (!value?.categoryId) return; this.saveSkills(value.categoryId); },
      'view-category': () => { }
    }; actionMap[this.mode]?.();
  }

  private saveSkills(categoryId: number) {
    this.skillsFA.value.forEach((s: any) =>
      this.skillService.addSkill({ ...s, categoryId }).subscribe());
    this.close(true);

  }

  closeModal() { this.close(); }


  private close(status?: boolean) { this.dialogRef.close(status); }





  getError(control: any, fieldName: string) { return this.formError.getErrorMessage(control!, fieldName); }

  isFormInvalid() { return this.formError.isFormInvalid(this.categoryForm); }

  isControlInvalid(control: AbstractControl | null) { return this.formError.isControlInvalid(control); }

}
