import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryDetails } from './enquiry-details';

describe('EnquiryDetails', () => {
  let component: EnquiryDetails;
  let fixture: ComponentFixture<EnquiryDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiryDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
