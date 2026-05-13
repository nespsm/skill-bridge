import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { WorkerDetailsData } from '../../../models/worker.interfaces';


@Component({
  selector: 'details-header',
  imports: [
    CommonModule,
    MatMenuModule,

  ],
  templateUrl: './details-header.html',
  styleUrl: './details-header.scss',
})
export class DetailsHeader {

  @Input() worker!: WorkerDetailsData;


  updateStatus(status: boolean) {

    this.worker.isActive = status;
  }
  
  getStatusClass(status: string | boolean) {
    
    return status === 'Hired for Abroad' || status === true ? "btn-active" : "btn-inactive";
  }
  
  updateAbroadStatus(status: string) {
    this.worker.hiredAbroad = status;
  }
}
