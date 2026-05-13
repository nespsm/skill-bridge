import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsTabs } from '../details-tabs/details-tabs';
import { DetailsMediaCard } from '../details-media-card/details-media-card';
import { DetailsHeader } from '../details-header/details-header';
import { ActivatedRoute } from '@angular/router';
import { WorkerManagementService } from '../../../services/worker-management-service';
import { WorkerDetailsData, WorkerSkill } from '../../../models/worker.interfaces';
import { DialogService } from '../../../../../../../../shared/src/lib/services/dialog-service';

@Component({
  selector: 'worker-details',
  imports: [CommonModule, DetailsTabs, DetailsMediaCard, DetailsHeader],
  templateUrl: './worker-details.html',
  styleUrl: './worker-details.scss',
})
export class WorkerDetails {

  worker = signal<WorkerDetailsData | null>(null);
  workerId = signal<number>(0);

  workerForm!: FormGroup;
  isEditMode = false;
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private workerService = inject(WorkerManagementService);
  private dialogService = inject(DialogService);

  ngOnInit() {
    this.workerId.set(+this.route.snapshot.queryParams['workerId']!);
    if (!this.workerId() && this.workerId() < 1) {
      this.dialogService.error('Worker Id is not found!');
      return;
    }
    this.loadWorker(this.workerId());
  }

  loadWorker(id: number) {
    this.workerService.getWorkerProfile(id).subscribe({
      next: (response) => {
        debugger;
        this.worker.set(response.result);
        this.worker.update(worker => ({
          ...worker!,
          hiredAbroad: 'Hired for Abroad',
          profileCompletion: "90",
          createdDate: new Date().toISOString()
        }));
        this.buildForm(this.worker());
      },
      error: (err) => {
        console.error('Failed to load worker', err);
      }
    });
  }

  buildForm(worker: WorkerDetailsData | null) {
    this.workerForm = this.fb.group({
      personalDetails: this.fb.group({
        name: [{ value: `${worker?.firstName} ${worker?.lastName}`, disabled: true }, [Validators.required]],
        age: [{ value: worker?.age, disabled: true }, [Validators.required]],
        mobileNumber: [{ value: worker?.phone, disabled: true }, [Validators.required]],
        contactNumber: [{ value: worker?.phone, disabled: true }, [Validators.required]],
        aadhaar: [{ value: worker?.aadhaar, disabled: true }, [Validators.required]],
        qualification: [{ value: worker?.qualification, disabled: true }, [Validators.required]],
        address: [{ value: worker?.address, disabled: true }, [Validators.required]],
        passport: [{ value: worker?.passport, disabled: true }, [Validators.required]],
        experience: [{ value: worker?.yearsOfExperience, disabled: true }, [Validators.required]],
      }),
      passport: this.fb.group({}),
      skills: this.fb.array(worker ? worker.workerSkills.map(skill => this.createSkillForm(skill)) : []),
      documents: this.fb.array([]),
      visaMedical: this.fb.group({}),
      hiringHistory: this.fb.array([]),
      emergencyNotes: this.fb.group({})
    });
  }


  private createSkillForm(skill: WorkerSkill): FormGroup {
    return this.fb.group({
      id: [skill.id],
      skillId: [skill.skill.id],
      skillName: [
        { value: skill.skill.skillName, disabled: true }
      ],
      categoryId: [skill.skill.category.id],
      categoryName: [
        { value: skill.skill.category.categoryName, disabled: true }
      ]
    });
  }

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
    this.isEditMode ? this.workerForm.enable() : this.workerForm.disable();
  }

  exportWorker(): void {
    const worker = this.worker();
    if (!worker) return;
    this.workerService.exportWorker(this.workerId()).subscribe();
  }

  save(): void {
    const worker = this.worker();
    if (!worker || this.workerForm.invalid) return;

    this.workerService.updateWorker(this.workerId(), this.workerForm.getRawValue()).subscribe();
  }

  get skillsArray(): FormArray {
    return this.workerForm.get('skills') as FormArray;
  }

}
