import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVisaMedicalForm } from './details-visa-medical-form';

describe('DetailsVisaMedicalForm', () => {
  let component: DetailsVisaMedicalForm;
  let fixture: ComponentFixture<DetailsVisaMedicalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsVisaMedicalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsVisaMedicalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
