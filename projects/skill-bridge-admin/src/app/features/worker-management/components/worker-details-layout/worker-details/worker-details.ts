import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsTabs } from '../details-tabs/details-tabs';
import { DetailsMediaCard } from '../details-media-card/details-media-card';
import { DetailsHeader } from '../details-header/details-header';
import { ActivatedRoute } from '@angular/router';
import { WorkerManagementService } from '../../../services/worker-management-service';
import { WorkerDetailsData } from '../../../models/worker.interfaces';

@Component({
  selector: 'worker-details',
  imports: [CommonModule, DetailsTabs, DetailsMediaCard, DetailsHeader],
  templateUrl: './worker-details.html',
  styleUrl: './worker-details.scss',
})
export class WorkerDetails {


  worker: WorkerDetailsData = {
    id: 1,
    workerId: "SKB-005876",
    name: "Rajesh Kumar",
    profileCompletion: 90,
    role: "Mehcanic",
    status: "Active",
    interest: "Yes",
    hiredAbroad: "Hired for Abroad",
    createdDate: "12-12-2025",
    personalDetails: [],
    passport: [],
    skills: [],
    documents: [],
    visaMedical: {},
    hiringHistory: [],
    emergencyNotes: {},

    mobileNumber: "9876543211",
  };

  workerForm!: FormGroup;
  isEditMode = false;
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private workerService = inject(WorkerManagementService);

  ngOnInit() {
    const id = this.route.snapshot.queryParams['workerId']!;
    this.loadWorker(id);
    this.buildForm(this.worker);
  }

  loadWorker(id: string) {
    this.workerService.getWorker({ id }).subscribe(worker => {
      this.worker = worker;
      this.buildForm(worker);
    });
  }

  buildForm(worker: WorkerDetailsData) {
    this.workerForm = this.fb.group({
      personalDetails: this.fb.group({
        name: [{ value: "Rajesh Kumar", disabled: true }, [Validators.required]],
        age: [{ value: "29", disabled: true }, [Validators.required]],
        mobileNumber: [{ value: "9876543266", disabled: true }, [Validators.required]],
        contactNumber: [{ value: "9876543212", disabled: true }, [Validators.required]],
        aadhaar: [{ value: "9876 5451 5263", disabled: true }, [Validators.required]],
        qualification: [{ value: "High School", disabled: true }, [Validators.required]],
        address: [{ value: "C-165, Secotr-199, Delhi", disabled: true }, [Validators.required]],
        passport: [{ value: "Yes", disabled: true }, [Validators.required]],
        experience: [{ value: "5 years", disabled: true }, [Validators.required]],
      }),
      passport: this.fb.group({}),
      skills: this.fb.array([]),
      documents: this.fb.array([]),
      visaMedical: this.fb.group({}),
      hiringHistory: this.fb.array([]),
      emergencyNotes: this.fb.group({})
    });
  }
  toggleEdit() {
    this.isEditMode = !this.isEditMode;
    this.isEditMode ? this.workerForm.enable() : this.workerForm.disable();
  }

  exportWorker() {
    this.workerService.exportWorker(this.worker.id).subscribe();
  }

  save() {
    if (this.workerForm.invalid) return;
    this.workerService.updateWorker(this.worker.id, this.workerForm.value).subscribe();
  }

}
