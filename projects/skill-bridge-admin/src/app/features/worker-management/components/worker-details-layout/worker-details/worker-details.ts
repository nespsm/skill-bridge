import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsTabs } from '../details-tabs/details-tabs';
import { DetailsMediaCard } from '../details-media-card/details-media-card';
import { DetailsHeader } from '../details-header/details-header';
import { ActivatedRoute } from '@angular/router';
import { WorkerManagementService } from '../../../services/worker-management-service';
import { DialogService } from '../../../../../../../../shared/src/lib/services/dialog-service';
import { WorkerProfile, WorkerProfileResponse } from '../../../models/worker.interfaces';
import { WorkerProfileFormService } from '../../../services/worker-profile-form.service';

@Component({
  selector: 'worker-details',
  imports: [CommonModule, DetailsTabs, DetailsMediaCard, DetailsHeader],
  templateUrl: './worker-details.html',
  styleUrl: './worker-details.scss',
})
export class WorkerDetails {

  worker = signal<WorkerProfile | null>(null);
  workerId = signal<number>(0);

  workerForm!: FormGroup;
  isEditMode = false;
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private workerService = inject(WorkerManagementService);
  private workerProfileFormService = inject(WorkerProfileFormService);
  private dialogService = inject(DialogService);

  ngOnInit() {
    this.workerId.set(+this.route.snapshot.queryParams['workerId']!);
    if (!this.workerId() && this.workerId() < 1) {
      this.dialogService.error('Worker Id is not found!');
      return;
    }
    this.loadWorkerData(this.workerId());
  }

  loadWorkerData(id: number) {
    this.workerService.getWorkerProfile(id).subscribe({
      next: (response: WorkerProfileResponse) => {
        this.worker.set(response.result);
        this.worker.update(worker => ({
          ...worker!,
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

  buildForm(worker: WorkerProfile | null): void {
    this.workerForm =
      this.workerProfileFormService.buildForm(worker);
  }

  get skillsFormArray(): FormArray {
    return this.workerProfileFormService.getSkillsFormArray(
      this.workerForm
    );
  }

  getSkillControls(index: number): FormArray {
    return this.workerProfileFormService.getSkillControls(
      this.workerForm,
      index
    );
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

}
