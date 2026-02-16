import { Component, Input } from '@angular/core';
import { WorkerCatType } from '../../../models/worker.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'worker-category-tile',
  imports: [CommonModule],
  templateUrl: './worker-category-tile.html',
  styleUrl: './worker-category-tile.scss',
})
export class WorkerCategoryTile {

  @Input() workerTypes: WorkerCatType[] = [];
}
