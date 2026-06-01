import { Injectable } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Skill, SkillCategory, WorkerProfile } from '../models/worker.interfaces';


@Injectable({
    providedIn: 'root',
})
export class WorkerProfileFormService {
    constructor(private fb: FormBuilder) { }

    buildForm(worker: WorkerProfile | null): FormGroup {
        return this.fb.group({
            personalDetails: this.createPersonalDetailsGroup(worker),
            passport: this.fb.group({}),
            skills: this.fb.array(worker?.skill?.map((skillCategory) => this.createSkillCategoryForm(skillCategory)) || []),
            documents: this.fb.array([]),
            visaMedical: this.fb.group({}),
            hiringHistory: this.fb.array([]),
            emergencyNotes: this.fb.group({}),
        });
    }

    private createPersonalDetailsGroup(
        worker: WorkerProfile | null
    ): FormGroup {
        return this.fb.group({
            name: [{ value: worker ? `${worker.firstName} ${worker.lastName}` : '', disabled: true, }, [Validators.required],],
            age: [{ value: worker?.workerPersonalDetails?.age ?? worker?.age ?? null, disabled: true, }, [Validators.required],],
            mobileNumber: [{ value: worker?.phone ?? '', disabled: true, }, [Validators.required],],
            contactNumber: [{ value: worker?.phone ?? '', disabled: true, }, [Validators.required],],
            aadhaar: [{ value: worker?.workerPersonalDetails?.aadhaarNo ?? '', disabled: true, }, [Validators.required],],
            qualification: [{ value: worker?.workerPersonalDetails?.highestQualification ?? '', disabled: true, }, [Validators.required],],
            address: [{ value: worker?.workerPersonalDetails?.address ?? worker?.address ?? '', disabled: true, }, [Validators.required],],
            passport: [{ value: '', disabled: true, },],
            experience: [{ value: worker?.yearsOfExperience ?? null, disabled: true, }, [Validators.required],],
            gender: [{ value: worker?.workerPersonalDetails?.gender ?? worker?.gender ?? '', disabled: true, },],
            city: [{ value: worker?.workerPersonalDetails?.city ?? worker?.city ?? '', disabled: true, },],
            state: [{ value: worker?.workerPersonalDetails?.state ?? worker?.state ?? '', disabled: true, },],
            pincode: [{ value: worker?.workerPersonalDetails?.pincode ?? '', disabled: true, },],
            disability: [{ value: worker?.workerPersonalDetails?.disability ?? '', disabled: true, },],
        });
    }

    private createSkillCategoryForm(
        category: SkillCategory
    ): FormGroup {
        return this.fb.group({
            categoryId: [category.categoryId],
            categoryName: [{ value: category.categoryName, disabled: true, },],
            skills: this.fb.array(category.skills.map((skill) => this.createSkillForm(skill))),
        });
    }

    private createSkillForm(skill: Skill): FormGroup {
        return this.fb.group({
            skillId: [skill.skillId],
            skillName: [{ value: skill.skillName, disabled: true, },],
            isVerified: [{ value: skill.isVerified, disabled: true, },],
        });
    }

    getSkillsFormArray(form: FormGroup): FormArray {
        return form.get('skills') as FormArray;
    }

    getSkillControls(
        form: FormGroup,
        index: number
    ): FormArray {
        return this.getSkillsFormArray(form).at(index).get('skills') as FormArray;
    }
}