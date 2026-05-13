import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WorkerCatSkillType } from '../../../models/worker.interfaces';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../../../../../../shared/src/lib/pipes/truncate-pipe';

@Component({
  selector: 'worker-category-skill-tile',
  imports: [CommonModule, TruncatePipe],
  templateUrl: './worker-category-skill-tile.html',
  styleUrl: './worker-category-skill-tile.scss',
})
export class WorkerCategorySkillTile implements OnInit {


  @Input() skills: WorkerCatSkillType[] = [];
  @Input() skillCatName: string = "";
  @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;


  @Output() skillClick = new EventEmitter<WorkerCatSkillType>();


  ngOnInit(): void {
  }
  
  onSkillClick(type: WorkerCatSkillType) {
    this.skillClick.emit(type);
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
