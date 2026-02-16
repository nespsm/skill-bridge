import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAnalytics } from './request-analytics';

describe('RequestAnalytics', () => {
  let component: RequestAnalytics;
  let fixture: ComponentFixture<RequestAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAnalytics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAnalytics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
