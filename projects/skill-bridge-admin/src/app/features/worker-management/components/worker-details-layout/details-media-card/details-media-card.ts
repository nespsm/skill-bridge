import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WorkerDetailsData } from '../../../models/worker.interfaces';


@Component({
  selector: 'details-media-card',
  imports: [MatProgressBarModule],
  templateUrl: './details-media-card.html',
  styleUrl: './details-media-card.scss',
})
export class DetailsMediaCard {

  @Input() worker!: any;
  @Output() export: any = new EventEmitter<any>();
  @Output() edit: any = new EventEmitter<any>();

  getThumb(worker: WorkerDetailsData) {
    if (worker.videoUrl) {
      return worker.videoThumb;
    } else {

      return "/images/default-video-thumb.png";
    }

  }

  onThumbError(event: any) {
    event.target.src = 'assets/default-video-thumb.png';
  }

}
