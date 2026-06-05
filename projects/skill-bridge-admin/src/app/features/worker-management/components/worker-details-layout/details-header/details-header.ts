import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { WorkerProfile } from '../../../models/worker.interfaces';

@Component({
  selector: 'details-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule
  ],
  templateUrl: './details-header.html',
  styleUrl: './details-header.scss',
})
export class DetailsHeader {

  @Input({ required: true })
  worker!: WorkerProfile;

  get currentAbroadStatus(): string {
    return this.worker?.abroadStatus?.abroadStatus || 'Not Interested';
  }

  get currentActiveStatus(): boolean {
    return !!this.worker?.isActive;
  }

  updateStatus(status: boolean): void {
    this.worker.isActive = status;
  }

  updateAbroadStatus(status: string): void {
    if (!this.worker.abroadStatus) {
      this.worker.abroadStatus = {
        workerId: this.worker.id,
        abroadStatus: status,
        country: ''
      };
      return;
    }

    this.worker.abroadStatus.abroadStatus = status;
  }

  getStatusClass(status: string | boolean | null | undefined): string {
    const isActive =
      status === true ||
      status === 'Interested';

    return isActive ? 'btn-active' : 'btn-inactive';
  }
}