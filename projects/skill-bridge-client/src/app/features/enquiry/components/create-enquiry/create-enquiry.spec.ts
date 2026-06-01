import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnquiry } from './create-enquiry';

describe('CreateEnquiry', () => {
  let component: CreateEnquiry;
  let fixture: ComponentFixture<CreateEnquiry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEnquiry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEnquiry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
