import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAlerts } from './new-alerts';

describe('NewAlerts', () => {
  let component: NewAlerts;
  let fixture: ComponentFixture<NewAlerts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAlerts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAlerts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
