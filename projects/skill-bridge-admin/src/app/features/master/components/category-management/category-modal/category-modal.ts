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
import { DialogService } from '../../../../../../../../shared/src/lib/services/dialog-service';
import { SkillType } from '../../../models/skill.model';
import { forkJoin } from 'rxjs';

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
  private dialogService = inject(DialogService);
  input: any = inject(MAT_DIALOG_DATA);

  mode!: MasterModalMode;
  modeName!: string;
  data!: CategoryType;
  categories!: any;
  skills!: SkillType[];
  originalSkills: SkillType[] = [];
  categoryForm = this.fb.group({
    categoryId: [0, [Validators.required]],
    categoryName: ['', [Validators.required]],
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
    this.originalSkills = structuredClone(this.skills);
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
      id: [skill?.id || null, []],
      skillName: [skill?.skillName || '', [Validators.required]],
      description: [skill?.description || '']
    });
  }

  addSkill() {
    this.skillsFA.push(this.createSkillForm());
  }

  removeRow(index: number, skill: any) {
    this.dialogService.confirm(`You want to delete ${skill.skillName} Skill?`, 'Are you sure!')
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.skillsFA.removeAt(index);
        }
      });

  }

  // ========================= // EVENTS // ========================= 
  onCategoryChange(categoryId: number) {
    const category = this.categories.find((c: any) => c.id === categoryId);
    this.categoryForm.patchValue({ description: category?.description });
    this.categoryForm.patchValue({ categoryName: category?.categoryName });
  }


  // submit() {
  //   const value = this.categoryForm.getRawValue();
  //   const actionMap: Record<
  //     MasterModalMode,
  //     () => void> = {
  //     'add-category': () => this.categoryService.addCategory(value).subscribe(() => this.close(true)),
  //     'edit-category': () => this.categoryService.updateCategory({ ...value }).subscribe(() => this.close(true)),
  //     'add-category-skills': () => this.saveSkills(this.data.id),
  //     'add-skills': () => { if (!value?.categoryId) return; this.saveSkills(value.categoryId); },
  //     'view-category': () => { }
  //   }; actionMap[this.mode]?.();
  // }



  submit() {

    const actionMap: Record<MasterModalMode, () => void> = {
      'add-category': () => this.handleAddCategory(),

      'edit-category': () => this.handleEditCategory(),

      'add-category-skills': () => {
        const showSkillSuccessPopup = true;
        this.syncSkills(this.data.id, showSkillSuccessPopup)
      },

      'add-skills': () => {
        const categoryId = this.categoryForm.getRawValue().categoryId!;
        const showSkillSuccessPopup = true;
        this.saveSkills(categoryId, showSkillSuccessPopup);
      },

      'view-category': () => { }
    };

    actionMap[this.mode]?.();
  }


  private syncSkills(categoryId: number, showSkillSuccessPopup: boolean) {
    const { added, updated, deleted } = this.getSkillChanges();
    const requests = [];

    // ADD
    if (added.length) {
      requests.push(
        ...added.map((s: any) => this.skillService.addSkill({ ...s, categoryId })
        )
      );
    }

    // UPDATE
    if (updated.length) {
      requests.push(
        ...updated.map((s: any) =>
          this.skillService.updateSkill({ ...s, categoryId })
        )
      );
    }

    // DELETE
    if (deleted.length) {
      requests.push(
        ...deleted.map((s: any) =>
          this.skillService.deleteSkill({ id: s.id, skillName: s.skillName })
        )
      );
    }

    // NOTHING TO PROCESS
    if (!requests.length) {
      this.close(true);
      return;
    }

    forkJoin(requests).subscribe({
      next: () => {
        if (showSkillSuccessPopup) this.dialogService.success('Skills updated successfully!');
        this.close(true);
      },
      error: (err) => {
        console.error(err);
        this.dialogService.error('Failed to save skills. Please try again!');
      }
    });
  }

  private handleEditCategory() {
    const value = this.categoryForm.getRawValue();
    const categoryPayload = {
      categoryId: value.categoryId,
      categoryName: value.categoryName,
      description: value.description,
    }
    this.categoryService.updateCategory(categoryPayload)
      .subscribe((res) => {
        const showSkillSuccessPopup = false;
        this.syncSkills(this.data.id, showSkillSuccessPopup);
        this.dialogService.success(res.message);
      });
  }

  private handleAddCategory() {
    const value = this.categoryForm.getRawValue();
    this.categoryService.addCategory(value)
      .subscribe(res => {
        const categoryId = res.result.id;
        const showSkillSuccessPopup = false;
        this.saveSkills(categoryId, showSkillSuccessPopup);
      });
  }

  private getSkillChanges() {
    const currentSkills = this.skillsFA.getRawValue();
    const added = currentSkills.filter((s: any) => !s.id);

    const updated = currentSkills.filter((s: any) => {
      if (!s.id) return false;
      const original = this.originalSkills.find((o: any) => o.id === s.id);
      return (
        original && (
          original.skillName !== s.skillName ||
          original.description !== s.description
        )
      );
    });

    const deleted = this.originalSkills.filter((o: any) => {
      return !currentSkills.some((c: any) => c.id === o.id);
    });

    return {
      added,
      updated,
      deleted
    };
  }

  private saveSkills(categoryId: number, showSkillSuccessPopup: boolean) {

    const requests = this.skillsFA.value
      .filter((s: any) => !s.id)
      .map((s: any) => this.skillService.addSkill({ ...s, categoryId }));

    // No new skills
    if (!requests.length) { this.close(true); return; }

    forkJoin(requests).subscribe({
      next: () => {
        if (showSkillSuccessPopup) this.dialogService.success('Skill(s) added successfully!')
        else this.dialogService.success('Category added successfully');
        this.close(true);
      },
      error: (err) => {
        console.error(err);
        this.dialogService.error('Failed to save skills. Please try again!');
      }
    });
  }

  closeModal() { this.close(); }


  private close(status?: boolean) { this.dialogRef.close(status); }





  getError(control: any, fieldName: string) { return this.formError.getErrorMessage(control!, fieldName); }

  isFormInvalid() { return this.formError.isFormInvalid(this.categoryForm); }

  isControlInvalid(control: AbstractControl | null) { return this.formError.isControlInvalid(control); }

}
