import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDialog } from './common-dialog';

describe('CommonDialog', () => {
  let component: CommonDialog;
  let fixture: ComponentFixture<CommonDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
