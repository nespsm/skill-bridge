import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerListTable } from './worker-list-table';

describe('WorkerListTable', () => {
  let component: WorkerListTable;
  let fixture: ComponentFixture<WorkerListTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerListTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerListTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
