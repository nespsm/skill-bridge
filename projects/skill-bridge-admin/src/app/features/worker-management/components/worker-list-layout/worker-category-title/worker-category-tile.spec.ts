import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCategoryTile } from './worker-category-tile';

describe('WorkerCategoryTile', () => {
  let component: WorkerCategoryTile;
  let fixture: ComponentFixture<WorkerCategoryTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerCategoryTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerCategoryTile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
