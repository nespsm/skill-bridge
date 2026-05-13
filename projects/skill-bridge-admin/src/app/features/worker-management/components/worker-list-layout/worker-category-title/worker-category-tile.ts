import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerCatType } from '../../../models/worker.interfaces';
import { TruncatePipe } from '../../../../../../../../shared/src/lib/pipes/truncate-pipe';

@Component({
  selector: 'worker-category-tile',
  imports: [CommonModule, TruncatePipe],
  templateUrl: './worker-category-tile.html',
  styleUrl: './worker-category-tile.scss',
})
export class WorkerCategoryTile {

  @Input() workerTypes: WorkerCatType[] = [];
  @Output() categoryClick = new EventEmitter<WorkerCatType>();

  onCategoryClick(type: WorkerCatType) {
    this.categoryClick.emit(type);
  }
}
