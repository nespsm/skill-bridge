import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiriesManagement } from './enquiries-management';

describe('EnquiriesManagement', () => {
  let component: EnquiriesManagement;
  let fixture: ComponentFixture<EnquiriesManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiriesManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiriesManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
