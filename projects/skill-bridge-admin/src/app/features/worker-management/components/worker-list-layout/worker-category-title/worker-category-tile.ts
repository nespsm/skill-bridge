import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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

  @ViewChild('slider')
  slider!: ElementRef<HTMLDivElement>;



  scrollLeft() {
    this.slider.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }
}
