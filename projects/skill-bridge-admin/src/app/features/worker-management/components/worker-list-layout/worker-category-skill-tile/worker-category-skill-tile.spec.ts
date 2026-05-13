import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCategorySkillTile } from './worker-category-skill-tile';

describe('WorkerCategorySkillTile', () => {
  let component: WorkerCategorySkillTile;
  let fixture: ComponentFixture<WorkerCategorySkillTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerCategorySkillTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerCategorySkillTile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
