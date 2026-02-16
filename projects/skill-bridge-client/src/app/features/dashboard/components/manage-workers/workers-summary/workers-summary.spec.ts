import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersSummary } from './workers-summary';

describe('WorkersSummary', () => {
  let component: WorkersSummary;
  let fixture: ComponentFixture<WorkersSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkersSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkersSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
