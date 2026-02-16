import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPassportForm } from './details-passport-form';

describe('DetailsPassportForm', () => {
  let component: DetailsPassportForm;
  let fixture: ComponentFixture<DetailsPassportForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPassportForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPassportForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
