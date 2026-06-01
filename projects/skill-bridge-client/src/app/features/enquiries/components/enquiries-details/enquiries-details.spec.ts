import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiriesDetails } from './enquiries-details';

describe('EnquiriesDetails', () => {
  let component: EnquiriesDetails;
  let fixture: ComponentFixture<EnquiriesDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiriesDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiriesDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
