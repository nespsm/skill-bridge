import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerListData } from '../../../models/worker.interfaces';
import { DynamicClassService } from '../../../../../../../../shared/src/lib/services/dynamic-class-service';

@Component({
  selector: 'worker-list-table',
  imports: [CommonModule],
  templateUrl: './worker-list-table.html',
  styleUrl: './worker-list-table.scss',
})
export class WorkerListTable {


  @Input() workers: WorkerListData[] = [];
  @Input() workersCount: number = 0;

  @Output() view = new EventEmitter<number>();
  @Output() call = new EventEmitter<WorkerListData>();

  private dynamicClass = inject(DynamicClassService);




  getBadgeClass(value: string): string {
    return this.dynamicClass.getBadgeClass(value);
  }



  viewWorkerDetails(id: number) {
    this.view.emit(id);
  }

  callWorker(worker: WorkerListData) {
    this.call.emit(worker);
  }
}
