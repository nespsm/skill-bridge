import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEmergencyNotes } from './details-emergency-notes';

describe('DetailsEmergencyNotes', () => {
  let component: DetailsEmergencyNotes;
  let fixture: ComponentFixture<DetailsEmergencyNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEmergencyNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsEmergencyNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
