import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSkillsForm } from './details-skills-form';

describe('DetailsSkillsForm', () => {
  let component: DetailsSkillsForm;
  let fixture: ComponentFixture<DetailsSkillsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsSkillsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSkillsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
