import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEnquiry } from './dashboard-enquiry';

describe('DashboardEnquiry', () => {
  let component: DashboardEnquiry;
  let fixture: ComponentFixture<DashboardEnquiry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEnquiry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEnquiry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
