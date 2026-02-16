import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRequests } from './job-requests';

describe('JobRequests', () => {
  let component: JobRequests;
  let fixture: ComponentFixture<JobRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobRequests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
