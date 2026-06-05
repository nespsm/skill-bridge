import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


import { WorkerListData } from '../../../models/worker.interfaces';
import { DynamicClassService } from '../../../../../../../../shared/src/lib/services/dynamic-class-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'worker-list-table',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './worker-list-table.html',
  styleUrl: './worker-list-table.scss',
})
export class WorkerListTable {


  @Input() workers: WorkerListData[] = [];
  @Input() workersCount: number = 0;
  @Input() page = 0;
  @Input() size = 10;

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() view = new EventEmitter<number>();
  @Output() call = new EventEmitter<WorkerListData>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  sortBy = '';
  searchKey = '';

  private dynamicClass = inject(DynamicClassService);




  getBadgeClass(value: string): string {
    return this.dynamicClass.getBadgeClass(value);
  }


  onPaginationChange(event: PageEvent) {

    this.pageChange.emit(event);
  }

  viewWorkerDetails(id: number) {
    this.view.emit(id);
  }

  callWorker(worker: WorkerListData) {
    this.call.emit(worker);
  }


  onSortChange(sortField: string): void {
    this.sortChange.emit(sortField);
  }

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }
}
