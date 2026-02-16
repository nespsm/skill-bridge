import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDocumentsForm } from './details-documents-form';

describe('DetailsDocumentsForm', () => {
  let component: DetailsDocumentsForm;
  let fixture: ComponentFixture<DetailsDocumentsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDocumentsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDocumentsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
