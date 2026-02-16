import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPersonalForm } from './details-personal-form';

describe('DetailsPersonalForm', () => {
  let component: DetailsPersonalForm;
  let fixture: ComponentFixture<DetailsPersonalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPersonalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPersonalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
